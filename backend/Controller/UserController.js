import User from "../model/UserSchema.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendEmailFun} from "../config/sendEmail.js";
import { VerificationEmail } from "../utils/verifyEmailTemplate.js";
import { generatedAccessToken } from "../utils/generatedAccessToken.js";
import { generatedRefreshToken } from "../utils/generatedRefreshToken.js";
import fs from 'fs'
import cloudinary from "../middleware/cloudinary.js";

// register Controller
export const registerUser = async (req, res) => {
  try{
    let user
     const { name,email, password } = req.body;
     
     if (!name || !email || !password) {
       return res.status(400).json({
         success: false,
         message: "Name, email and password are required",
         error:true,
       });
     }

    user = await User.findOne({ email});
 
     if (user) {
       return res.status(409).json({
         success: false,
         message: "User already exists with this email ",
         error:true,
       });
     }

     const VerifyCode =Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user=await User.create({ 
      name:name, 
      email:email, 
      password:hashedPassword, 
      otp:VerifyCode,
      otp_expiry:Date.now()+ 600000 
    })

    await user.save();

    //send verification email
    const  VerifyEmail=await sendEmailFun({
        sendTo:email,
        subject:"verify email from Ecommerce App",
        text:"",
        html:VerificationEmail(name,VerifyCode),
    })

    const token=jwt.sign({email : user.email, id:user._id},
      process.env.JSON_WEB_TOkEN_SECRET_KEY
    );

   

    return res.status(200).json({
      success: true,
      error:false,
      message: "User registered successfully! Please Verify your email.",
      token:token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
       
      },
    });
  }
  catch(error){
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
      error:true,
    });
  }
}
// Email Verification Controller
export const verifyEmailController = async (req, res) => {
  try{
      const { email, otp }=req.body;

      const user = await User.findOne({ email:email});
 
       if (!user) {
         return res.status(400).json({
           success: false,
           message: "User not found ",
           error:true,
         });
       }

       const  isCodeValid=user.otp==otp;
       const isNotExpired=user.otp_expiry>Date.now();

       if(isCodeValid && isNotExpired){
        user.verify_email=true;
        user.otp=null;
        user.otp_expiry=null;
        await user.save();
        return res.status(200).json({
           success: true,
           message: "Email verified Successfully",
        })
       }else if(!isCodeValid){
           return res.status(400).json({
           success: false,
           message: "Invalid OTP",
           error:true,
        })
       }else {
           return res.status(400).json({
           success: false,
           message: "OTP Expired",
           error:true,         
        })
      }
  }
  catch(error){
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
      error:true,
      
    });
  }
}

// login  Controller
export const loginUser = async (req, res) => {
  try{
     const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

     const user = await User.findOne({ email:email}).select("+password");
     
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not Register ",
          error:true,
        });
      }

      if (user.status !=="active") {
         return res.status(400).json({
           success: false,
           message: "Contact to admin ",
           error:true,
         });
       }

       if (user.verify_email !== true) {
         return res.status(400).json({
           success: false,
           message: " Your Email is not Verify yet and Please Verify your email first",
           error:true, 
         });
       }

      const checkPassword = await bcrypt.compare(password, user.password);
       if(!checkPassword){
         return res.status(400).json({
           success: false,
           message: "Check your Password ",
           error:true,
         });
       }

      const accesstoken= await  generatedAccessToken(user._id);
      const refreshtoken= await  generatedRefreshToken(user._id);

      const  updateUser =await User.findByIdAndUpdate(user?._id,{
        last_login_date: new Date()
      })

      const cookiesOption={
        httpOnly :true,
        secure:process.env.NODE_ENV === "production",
        sameSite: "None"
      }

      res.cookie('accesstoken',accesstoken,cookiesOption)
      res.cookie('refreshtoken',refreshtoken,cookiesOption)

      res.status(200).json({
      success: true,
      error:false,
      message: "Login successfully! ",
      data: {
       accesstoken,
       refreshtoken
       
      },
    });

  }
  catch(error){
   console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
      error:true,
    });
  }
}

//logout Controller
export const logoutUser = async (req, res) => {
  try {
    
    const userid=req.userId

    const cookiesOption={
      httpOnly :true,
      secure:process.env.NODE_ENV === "production",
      sameSite: "None"
    }
    res.clearCookie('accesstoken',cookiesOption)
    res.clearCookie('refreshtoken',cookiesOption)

     await User.findByIdAndUpdate(userid,{
      refresh_token:""
    })

  
    res.status(200).json({
      success: true,
      error:false,
      message: "Logout successfully! ",
    });

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
      error:true,
    });
  }
}

//image upload Controller
var imagesArr=[];
export const userAvatarController = async (req, res) => {
  try {
      imagesArr=[];
  
     const userId=req.userId;
     const images=req.files;

     const user=await User.findOne({_id:userId});

     if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found ",
          error:true,
        });
      }
    
      if (!images || images.length === 0) {
        return res.status(400).json({
          message: "Image required",
          error: true,
        });
      }

      

    if (user.avatar) {
      const parts = user.avatar.split("/");
      const fileName = parts[parts.length - 1];
      const publicId = fileName.split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    }

      const options={
        user_filename:true,
        unique_filename:false,
        overwrite:false,
      };

     for(let i=0;i<images?.length; i++){
    

        const result =await cloudinary.uploader.upload(
          images[i].path,
          options,
        );
         imagesArr.push(result.secure_url);
         fs.unlinkSync(images[i].path);
        console.log(req.files[i].filename)
     }

    user.avatar=imagesArr[0];
    await user.save();

    return  res.status(200).json({
      _id:userId,
      avatar:imagesArr[0]
    });
  } catch (error) {
    console.error("Imges error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}
// /api/user?Img=?img1.jpg

export const removeImageFromCloudinary = async (req, res) => {
  const imgUrl=req.query.img;

  const urlArr=imgUrl.split("/"); 
  const image =urlArr[urlArr.length -1];
  const imageName=image.split(".")[0]; 

  const result= await cloudinary.uploader.destroy(
    imageName,
    
  )
  
   return  res.status(200).send(result)
  
}

export const updateUserDetails = async (req, res) => {
 try {

    const userId=req.userId
    const { name, email, password,mobile } = req.body;

    const userExist = await User.findOne({ _id:userId});
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: true,
      });
    }

    let verifyCode="";

    if(email && email !==userExist.email ){
      verifyCode=Math.floor(100000+Math.random() * 900000).toString();
    }
    
    let hashPassword=""

    if(password){
      const salt=await bcrypt.genSalt(10);
      hashPassword=await bcrypt.hash(password,salt);
    }else{
      hashPassword=userExist.password;
    }

    const updateUser=await User.findByIdAndUpdate(
      userId,
      {
        name:name,
        mobile:mobile,
        email:email,
        verify_email:email!==userExist.email ? false:true,
        password:hashPassword,
        otp:verifyCode !== "" ? verifyCode :null,
        otp_expiry:verifyCode !=="" ? Date.now()+ 600000 : ""
      },
      { new :true}
    )

    if (verifyCode) {
      await sendEmailFun({
        sendTo:email,
        subject:"verify email from Ecommerce App",
        text:"",
        html:VerificationEmail(name,verifyCode)
      })
    }

    

    return  res.status(200).json({
        success: true,
        message: "User Updated Succesfully",
        error:false,
        user:{
          name:updateUser?.name,
          _id:updateUser?._id,
          email:updateUser?.email,
          mobile:updateUser?.mobile,
          avatar:updateUser?.avatar,
          
        }
    });

  
 } catch (error) {
    console.error("Upadted error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
        
    });
 }
}

export const forgotPasswordController = async (req, res) => {
  try {
      const { email } = req.body;
      

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const user = await User.findOne({ email:email});
     
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Email not Avilable ",
          error:true,
        });
      }
      else{

        
           let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

           user.otp=verifyCode;
           user.otp_expiry= Date.now() + 600000;

           await user.save();

           await sendEmailFun({
             sendTo:email,
             subject:"Reset Password OTP - Ecommerce App",
             text:"",
             html:VerificationEmail(user?.name,verifyCode)
           })
     
           return res.status(200).json({
             success: true,
             message:"Please Check your email",
             error:false,
             
         });
        }     
    
  } catch (error) {

    console.error("Forgot password error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
        
    });
    
  }
}

export const verifyForgotPasswordOtpController = async (req, res) => {
  
  try {
      const {email,otp}=req.body
   
     if(!email || !otp){
       return res.status(400).json({
         message:"Provide Required field Email,Otp",
         error:true,
         success:false
       })
     }
   
     const user=await User.findOne({email:email})
   
     if(!user){
       return res.status(400).json({
         message:"Email Not send",
         success:false,
         error:true
       })
     }
   
     if(otp !== user.otp){
       return res.status(400).json({
         message:"Invalid Otp",
         success:false,
         error:true
       })
     }
     const currentTime=new Date().toISOString()

     if(user.otp_expiry < currentTime){
        return res.status(400).json({
         message:"Otp is expired",
         success:false,
         error:true
       })
     }

     user.otp="";
     user.otp_expiry="";

     await user.save();
   
     return res.status(200).json({
         message:"Verify otp successfully",
         success:true,
         error:false
      })

    
  } 
  catch (error) {
     return res.status(500).json({
         message: error.message|| error,
         success:false,
         error:error
       })
  }
}

export const resetpasswordController =async(req,res)=>{
  try {
     
    const {email, newPassword, confirmPassword}=req.body;

    if(!email || !newPassword || !confirmPassword){
      return res.status(400).json({
        message:"Provide Required Fileds email, newPassword, confirmPassword"
      })
    }

    const user= await User.findOne({email:email});

    if(!user){
      return res.status(400).json({
        message:" Email is not  available",
        success:false,
        error:true
      })
    }

    if(newPassword !== confirmPassword){
      return res.status(400).json({
        message:" newPassword and confirmPassword must be same",
        success:false,
        error:true
      })
    }

    const salt= await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(newPassword,salt);

    const update=await User.findByIdAndUpdate(user._id,{
      password :hashPassword
    })

    return res.status(200).json({
        message: "Password Update Succesfully",
        success:true,
        error:false
     })

  } catch (error) {
      return res.status(500).json({
         message: error.message|| error,
         success:false,
         error:error
      })
  }
}

export const refreshTokenController =async(req,res)=>{
  try {
     
    const refreshToken= req.cookies?.refreshToken || req?.headers?.authorization?.split(" ")[1]

       if(!refreshToken){   
        return res.status(400).json({
            message:"Invalid  token",
            success:false,
            error:true
        })
       }

       const verifyToken =await jwt.verify(refreshToken,process.env.SECRET_KEY_ACCESS_TOKEN)
         
        if(!verifyToken){
         return res.status(400).json({
             message:"token is expired",
             error:true,
             success:false
         })
        }
    
        const userId=verifyToken?._id;
        const newAccessToken =await generatedRefreshToken(userId);

        const cookiesOption={
          httpOnly:true,
          secure:true,
          sameSite:"None"
        }
    
        res.cookie('accessToken',newAccessToken,cookiesOption)

        return res.status(200).json({
            message: " Refresh Token Succesfully",
            success:true,
            error:false
         })

  } catch (error) {
      return res.status(500).json({
         message: error.message|| error,
         success:false,
         error:error
      })
  }
}

export const usertDetailsController =async(req,res)=>{
  try {

    const userId=req.userId;

    const user= await User.findById(userId).select("-password, -refreshToken");

      return res.status(200).json({
          message: " User Details",
          data:user,
          success:true,
          error:false
       })

  } catch (error) {
      return res.status(500).json({
         message: error.message|| error,
         success:false,
         error:error
      })
  }
}

// export const resetpasswordController =async(req,res)=>{
//   try {
     
//     const {email,oldPassword, newPassword, confirmPassword}=req.body;

//     if(!email || !newPassword || !confirmPassword){
//       return res.status(400).json({
//         message:"Provide Required Fileds email, newPassword, confirmPassword"
//       })
//     }

//     const user= await User.findOne({email:email}).select('+password');

//     if(!user){
//       return res.status(400).json({
//         message:" Email is not  available",
//         success:false,
//         error:true
//       })
//     }

//     const checkPassword=await bcrypt.compare(oldPassword,user.password);
//     if(!checkPassword){
//       return res.status(400).json({
//         message:" Your Old Password is wrong",
//         success:false,
//         error:true
//       })
//     }

//     if(newPassword !== confirmPassword){
//       return res.status(400).json({
//         message:" newPassword and confirmPassword must be same",
//         success:false,
//         error:true
//       })
//     }

//     const salt= await bcrypt.genSalt(10);
//     const hashPassword=await bcrypt.hash(newPassword,salt);

//     const update=await User.findByIdAndUpdate(user._id,{
//       password :hashPassword
//     })

//     return res.status(200).json({
//         message: "Password Update Succesfully",
//         success:true,
//         error:false
//      })

//   } catch (error) {
//       return res.status(500).json({
//          message: error.message|| error,
//          success:false,
//          error:error
//       })
//   }
// }
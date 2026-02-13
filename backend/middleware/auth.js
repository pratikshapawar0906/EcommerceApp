import  jwt from "jsonwebtoken"

export const auth=async(req,res,next)=>{
   try {
    
       const token= req.cookies?.accesstoken || req?.headers?.authorization?.split(" ")[1]  || req.query.token; 

       if(!token){   
        return res.status(400).json({
            message:"Provide token",
            success: false,
            error:true,
        })
       }

       const decode = jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)
  
       if(!decode){
        return res.status(400).json({
            message:"Unauthorized access",
            error:true,
            success:false
        })
       }

       req.userId=decode.id
       next()

   } catch (error) {
   
        return res.status(401).json({
            message:"YOu are not login",
            error:true,
            success:false
        })
  
    
   }
}
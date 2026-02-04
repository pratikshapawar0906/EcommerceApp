import Address from "../model/AddressSchema.js"
import User from "../model/UserSchema.js"

export const addAddressController=async(req,res)=>{
   try {

    const {addressLine1,city,pincode,mobile,state,status,country,selected}=req.body;
    const userId=req.userId;

    if(!addressLine1 || !city || !pincode || !mobile ||!state ||!country || selected === undefined ){
        return  res.json({
            success: false,
            message: "Please Provide all the fields",
            error:true,
        })
    }

    const saveAddress = await Address.create({
      addressLine1,
      city,
      pincode,
      mobile,
      state,
      status,
      country,
      userId
    });


    const updatAddressUser =await User.updateOne({_id:userId},{
        $push:{
            address_detail:saveAddress?._id
        }
    })

    return res.status(200).json({
      success: true,
      error:false,
      message: "Updated Address Successfully",
      Address:saveAddress
      
    });
    
   } catch (error) {
     console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
      error:true,
    });
   }
}

export const getAddressController=async(req,res)=>{
   try {

    const address= await Address.find({userId:req?.query?.userId});

     if(!address ){
        return  res.json({
            success: false,
            message: "Address not Found",
            error:true,
        })
    }


    return res.status(200).json({
      success: true,
      error:false,
      message: "get Address Successfully",
      address:address
      
    });
    
   } catch (error) {
     console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
      error:true,
    });
   }
}

export const selectAddressController=async(req,res)=>{
   try {

     const userId=req.params.id

     const address = await Address.findOne({ _id:req.params.id})
     
     if(!address ){
        return  res.json({
            success: false,
            message: "Address not Found",
            error:true,
        })
    }else{
      const updatedAddress=await User.findByIdAndUpdate(userId,{
        selected:req?.body?.selected
      },{
        new:true
      })
    }


    return res.status(200).json({
      success: true,
      error:false,
      message: "get Address Successfully",
      address:updatedAddress
      
    });
    
   } catch (error) {
     console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
      error:true,
    });
   }
}

export const removeAddressController=async(req,res)=>{
   try {

    const  userId=req.userId;
    const _id=req.params.id;

    if(!_id ){
        return  res.status(400).json({
            success: false,
            message: " Provide _id",
            error:true,
        })
    }

    const deleteAddress=await Address.deleteOne({_id:_id,userId:userId})

    if(!deleteAddress){
        return  res.status(400).json({
            success: false,
            message: " The address in the database  not found ",
            error:true,
        })
    }

    return res.status(200).json({
      success: true,
      error:false,
      message: "Remove Address Successfully",
      Address:deleteAddress
      
    });
    
   } catch (error) {
     console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
      error:true,
    });
   }
}


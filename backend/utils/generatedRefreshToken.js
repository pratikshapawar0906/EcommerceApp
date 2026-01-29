import User from "../model/UserSchema.js"
import jwt  from "jsonwebtoken"

export const generatedRefreshToken=async(userId)=>{
    const token=await jwt.sign({id:userId},
        process.env.SECRET_KEY_REFRESH_TOKEN,
        {expiresIn:'7d'}
    )
   
    
    const updateRefreshTokenUser= await User.updateOne(
        {  _id :userId},
        {
           refresh_token:token
        }
    )
    return token
}
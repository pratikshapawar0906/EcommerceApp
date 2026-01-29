import { Router } from "express";
import { forgotPasswordController, loginUser, logoutUser, refreshTokenController, registerUser, removeImageFromCloudinary, 
     resetpasswordController, updateUserDetails, userAvatarController, usertDetailsController,verifyEmailController,
      verifyForgotPasswordOtpController } from "../Controller/UserController.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router=Router()

//register User
router.post('/register', registerUser );
router.post('/verifyEmail', verifyEmailController );
router.post('/login', loginUser );
router.get('/logout',auth, logoutUser );
router.put('/user-avatar',auth,upload.array('avatar') ,userAvatarController)
router.delete('/deleteImage',auth,removeImageFromCloudinary)
router.put('/:id',auth,updateUserDetails)
router.post('/forgot-password',forgotPasswordController)
router.post('/verify-forgot-password',verifyForgotPasswordOtpController)
router.post('/reset-password',resetpasswordController)
router.post('/refresh-token',refreshTokenController)
router.get('/userDetails',auth,usertDetailsController)

export default router
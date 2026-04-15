import { Router } from "express";
import { addReviewController, forgotPasswordController, getReviewsController, loginUser, logoutUser, refreshTokenController, registerUser, registerUserWithGoogleController, removeImageFromCloudinary, 
     resetpasswordController, updateUserDetails, userAvatarController, usertDetailsController,verifyEmailController,
      verifyForgotPasswordOtpController } from "../Controller/UserController.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router=Router()

//register User
router.post('/register', registerUser );
router.post('/registerwithGoggle', registerUserWithGoogleController );
router.post('/verifyEmail', verifyEmailController );
router.post('/login', loginUser );
router.get('/logout',auth, logoutUser );
router.post('/user-avatar',auth,upload.array('avatar') ,userAvatarController)
router.delete('/deleteImage',auth,removeImageFromCloudinary)
router.put('/:id',auth,updateUserDetails)
router.post('/forgot-password',forgotPasswordController)
router.post('/verify-forgot-password',verifyForgotPasswordOtpController)
router.post('/reset-password',resetpasswordController)
router.post('/refresh-token',refreshTokenController)
router.get('/userDetails',auth,usertDetailsController)

//review of user
router.post('/addReview',auth,addReviewController)
router.get('/getReviews',getReviewsController)

export default router
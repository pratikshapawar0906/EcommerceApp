import { Router } from "express";
import { createBannerController, getAllBannerController, getSingleBannerController, removeImageFromCloudinary, updateHomeSliderController, uploadImagesController } from "../Controller/BannerController.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";



const router=Router();
router.get('/get',getAllBannerController);
router.get('/:id',getSingleBannerController);
router.post('/createBanner',createBannerController)
router.post('/uploadHomeSlider',auth,upload.array('Banner'),uploadImagesController)
router.delete('/deleteImageSlider',auth,removeImageFromCloudinary)
router.put('/updateHomeSlider/:id',auth,updateHomeSliderController)

export default router
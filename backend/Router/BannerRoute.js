import { Router } from "express";
import { createBannerController, deleteBannerController, getAllBannerController, getSingleBannerController, removeImageFromCloudinary, updateBannerController, uploadImagesController } from "../Controller/BannerController.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";



const router=Router();
router.get('/get',getAllBannerController);
router.get('/:id',getSingleBannerController);
router.post('/createBanner',createBannerController)
router.post('/uploadBanner',auth,upload.array('Banner'),uploadImagesController)
router.delete('/deleteImageSlider',auth,removeImageFromCloudinary)
router.delete('/deleteImageSlider/:id',auth,deleteBannerController)
router.put('/updateBanner/:id',auth,updateBannerController)

export default router
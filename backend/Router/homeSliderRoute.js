import { Router } from "express";
import { createHomeSliderController, deleteHomeSliderController, getAllHomeSliderController, getSingleHomeSliderController, removeImageFromCloudinary, updateHomeSliderController, uploadImagesController } from "../Controller/HomeSliderController.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";



const router=Router();
router.get('/get',getAllHomeSliderController);
router.get('/:id',getSingleHomeSliderController);
router.post('/createHomeSlider',createHomeSliderController)
router.post('/uploadHomeSlider',auth,upload.array('HomeSlider'),uploadImagesController)
router.delete('/deleteImageSlider',auth,removeImageFromCloudinary)
router.delete('/deleteImageSlider/:id',auth,deleteHomeSliderController)
router.put('/updateHomeSlider/:id',auth,updateHomeSliderController)

export default router
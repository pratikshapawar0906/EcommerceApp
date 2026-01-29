import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createCategoryController, deleteCategoryController, getAllCategoryController, getCategoriesController, getSingleCategoryController, getSubCategoriesController, 
    removeImageFromCloudinary, updateCategoryController, uploadImagesController } from "../Controller/CategoryController.js";
import { upload } from "../middleware/multer.js";
const router=Router()

router.post('/createCat',auth,createCategoryController);
router.post('/upload-Image',auth,upload.array('images'),uploadImagesController );
router.get('/',getAllCategoryController );
router.get('/get/count',getCategoriesController );
router.get('/get/SubCat/count',getSubCategoriesController );
router.get('/:id',getSingleCategoryController);
router.delete('/deleteImage',auth,removeImageFromCloudinary)
router.delete('/deleteCategory/:id',auth,deleteCategoryController)
router.put('/updatecategory/:id',auth,updateCategoryController)

export default router
import { Router } from "express"
import { createProduct, deleteProductController, getAllCatByCatIdController, getAllCatByCatNameController, getAllCatBySubCatIdController, getAllCatBySubCatNameController, getAllCatByThridSubCatIdController, getAllCatByThridSubCatNameController, getAllCategoryController, getAllProductCountController, getAllProductFeaturedController, getAllProductRatingController, getProductController, removeImageFromProductController, updateProductController, uploadImagesController } from "../Controller/ProductController.js"
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router=Router()

router.post('/upload-Image',auth,upload.array('images'),uploadImagesController );
router.post('/create',auth,createProduct);
router.get('/getAllProducts',getAllCategoryController);
router.get('/getProdByCatId/:id',getAllCatByCatIdController);
router.get('/getProdByCatName',getAllCatByCatNameController);
router.get('/getProdBySubCatId/:id',getAllCatBySubCatIdController);
router.get('/getProdBySubCatName',getAllCatBySubCatNameController);
router.get('/getProdByThirdSubCatId/:id',getAllCatByThridSubCatIdController);
router.get('/getProdByThirdSubCatName',getAllCatByThridSubCatNameController);
router.get('/getProdByRatingCatName',getAllProductRatingController);
router.get('/getProdByRating',getAllProductRatingController);
router.get('/getProdcount',getAllProductCountController);
router.get('/getProdFeatured',getAllProductFeaturedController);
router.delete('/deleteProduct/:id',auth,deleteProductController);
router.get('/getProduct/:id',getProductController);
router.delete('/deleteProductImage',auth,removeImageFromProductController);
router.put('/updateProduct/:id',auth,updateProductController);


export default router
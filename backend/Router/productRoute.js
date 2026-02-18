import { Router } from "express"
import { createProduct, createProductRAMS, createProductSize, createProductWeight, deleteMultipleProduct, deleteMultipleProductRAMS, deleteMultipleProductSize, deleteMultipleProductWeight, deleteProductController, deleteProductRAMSController, deleteProductSizeController, deleteProductWeightController, getAllCatByCatIdController, getAllCatByCatNameController, getAllCatBySubCatIdController, getAllCatBySubCatNameController, getAllCatByThridSubCatIdController, getAllCatByThridSubCatNameController, getAllCategoryController, getAllProductCountController, getAllProductFeaturedController, getAllProductRAMSController, getAllProductRatingController, getAllProductSizeController, getAllProductWeightController, getProductController, getProductRAMSByIdController, getProductSizeByIdController, getProductWeightByIdController, removeImageFromProductController, updateProductController, updateProductRAMSController, updateProductSizeController, updateProductWeightController, uploadImagesController } from "../Controller/ProductController.js"
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router=Router()

router.post('/upload-Image',auth,upload.array('images'),uploadImagesController );
router.post('/create',auth,createProduct);
router.post('/productRAMS/create',auth,createProductRAMS);
router.get('/getAllProducts',getAllCategoryController);
router.get('/getAllProductsRAMS',getAllProductRAMSController);
router.get('/getProductsRAMS/:id',getProductRAMSByIdController);
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
router.put('/updateProductRAMS/:id',auth,updateProductRAMSController);
router.delete('/deleteMultipleProduct', deleteMultipleProduct)
router.delete('/deleteProductRAMS/:id', deleteProductRAMSController)
router.delete('/deleteMultipleProductRAMS', deleteMultipleProductRAMS)

// weight
router.post('/productWeight/create',auth,createProductWeight);
router.get('/getAllProductsWeight',getAllProductWeightController);
router.get('/getProductsWeight/:id',getProductWeightByIdController);
router.put('/updateProductWeight/:id',auth,updateProductWeightController);
router.delete('/deleteProductWeight/:id', deleteProductWeightController)
router.delete('/deleteMultipleProductWeight', deleteMultipleProductWeight)

// size
router.post('/productSize/create',auth,createProductSize);
router.get('/getAllProductsSize',getAllProductSizeController);
router.get('/getProductsSize/:id',getProductSizeByIdController);
router.put('/updateProductSize/:id',auth,updateProductSizeController);
router.delete('/deleteProductSize/:id', deleteProductSizeController)
router.delete('/deleteMultipleProductSize', deleteMultipleProductSize)

export default router
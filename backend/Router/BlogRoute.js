import {Router} from 'express'
import { createBlogController, deleteBlogController, getAllBlogController, getSingleBlogController, removeImageFromCloudinary, updateBlogController, uploadImagesController } from '../Controller/BlogController.js';
import { auth } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js';

const router=Router()

router.get('/get',getAllBlogController);
router.get('/:id',getSingleBlogController);
router.post('/createBlog',createBlogController)
router.post('/uploadBlog',auth,upload.array('Blog'),uploadImagesController)
router.delete('/deleteImageSlider',auth,removeImageFromCloudinary)
router.delete('/deleteImageSlider/:id',auth,deleteBlogController)
router.put('/updateBlog/:id',auth,updateBlogController)

export default router
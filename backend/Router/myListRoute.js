import{ Router } from 'express'
import { auth } from '../middleware/auth.js';
import { addToMyListController, deleteMyListController, getMyListController } from '../Controller/MyListController.js';

const router=Router();

router.post("/add",auth,addToMyListController)
router.get("/get",auth,getMyListController)
router.delete("/remove/:id",auth,deleteMyListController)

export default router
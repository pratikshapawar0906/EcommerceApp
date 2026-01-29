import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addToCartItemController, deleteCartItemQtyController, getCartItemController, updateCartItemQtyController } from "../Controller/CartProductController.js";


const router=Router();

router.post('/add',auth,addToCartItemController)
router.get('/get',auth,getCartItemController)
router.put('/update-qty',auth,updateCartItemQtyController)
router.delete('/deleteCartItem',auth,deleteCartItemQtyController)

export default router
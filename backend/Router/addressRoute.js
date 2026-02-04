import { Router } from "express";
import { addAddressController, getAddressController, removeAddressController, selectAddressController} from "../Controller/AddressController.js";
import { auth } from "../middleware/auth.js";

const router=Router();
router.post('/add',auth,addAddressController)
router.get('/get',getAddressController)
router.put('/selectAddress/:id',auth,selectAddressController)
router.delete('/:id',auth,removeAddressController)

export default router;
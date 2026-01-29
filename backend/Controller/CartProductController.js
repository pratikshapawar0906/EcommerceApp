import CartProduct from "../model/cartProductSchema.js";
import User from "../model/UserSchema.js";


export const addToCartItemController=async(req,res)=>{
  try {

    const userId=req.userId
    const { productId }=req.body

    if(!productId){
        return res.status(404).json({
            message:"Provide productId",
            error:true,
            success: false,
        })
    }

    const checkItemCart=await CartProduct.findOne({
        userId:userId,
        productId:productId
    })   
    
    if(checkItemCart){
        return res.status(404).json({
            message:"Item already in cart",
            error:true,
            success: false,
        })
    }

     const checkItem= new CartProduct({
        quantity:1,
        userId:userId,
        productId:productId
    })   

 
    await checkItem.save();

    const updateCartUser=await User.updateOne({_id:userId},{
        $push:{
            shopping_cart:productId
        }
    })

    return  res.status(200).json({
          message:" Cart Item Added Successfully",
          success: true,
          error:false,
          checkItem:checkItem
        });
    
  } catch (error) {
     res.status(500).json({
            message: error.message || error,
            error:true,
            success: false,
        }); 
  }
}

export const getCartItemController=async(req,res)=>{
  try {

    const userId=req.userId
    
    const cartItem=await CartProduct.find({
        userId:userId,
    }).populate("productId")  

    if(!cartItem){
        return res.status(404).json({
            message:"Provide productId",
            error:true,
            success: false,
        })
    }


    return  res.status(200).json({
          message:" Cart Item Successfully",
          success: true,
          error:false,
          cartItem:cartItem
        });
    
  } catch (error) {
     res.status(500).json({
            message: error.message || error,
            error:true,
            success: false,
        }); 
  }
}

export const updateCartItemQtyController=async(req,res)=>{
  try {

    const userId=req.userId
    const { qty,_id}=req.body
    

    if(!_id || !qty){
        return res.status(404).json({
            message:"Provide _id, qty",
            error:true,
            success: false,
        })
    }

    const updateCartItem=await CartProduct.updateOne({
        _id:_id,
        userId:userId
    },{
        quantity:qty
    })


    return  res.status(200).json({
          message:"Update Cart Item Successfully",
          success: true,
          error:false,
          updateCartItem:updateCartItem
        });
    
  } catch (error) {
     res.status(500).json({
            message: error.message || error,
            error:true,
            success: false,
        }); 
  }
}

export const deleteCartItemQtyController=async(req,res)=>{
  try {

    const userId=req.userId
    const { _id,productId}=req.body
    

    if(!_id || !productId){
        return res.status(404).json({
            message:"Provide _id,productId",
            error:true,
            success: false,
        })
    }

    const deleteCartItem=await CartProduct.deleteOne({
        _id:_id,
        userId:userId
    })


    if(!deleteCartItem ){
        return res.status(404).json({
            message:" the Product in the cart is not found ",
            error:true,
            success: false,
        })
    }

    const  user=await User.findOne({_id:userId})

    const cartItems=user?.shopping_cart;

    const updateUserCart=[...cartItems.slice(0,cartItems.indexOf(productId)),
        ...cartItems.slice(cartItems.indexOf(productId)+ 1)];

    user.shopping_cart=updateUserCart;
    await user.save()

    return  res.status(200).json({
          message:"Delete Cart Items Successfully",
          success: true,
          error:false,
          user:user
        });
    
  } catch (error) {
     res.status(500).json({
            message: error.message || error,
            error:true,
            success: false,
        }); 
  }
}

import CartProduct from "../model/cartProductSchema.js";



export const addToCartItemController=async(req,res)=>{
  try {

    const userId=req.userId
    const { productId,productTitle,image, rating,price,subTotal,quantity,countInStock }=req.body

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
        quantity:quantity,
        userId:userId,
        productId:productId,
        productTitle:productTitle,
        image:image,
        rating:rating,
        price:price,
        subTotal:subTotal,
        countInStock:countInStock

    })   

 
    const save=await checkItem.save();

    

    return  res.status(200).json({
          message:" Cart Item Added Successfully",
          success: true,
          error:false,
          data:save
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
    })  



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

    
    

    return  res.status(200).json({
          message:"Delete Cart Items Successfully",
          success: true,
          error:false,
          data:deleteCartItem
        });
    
  } catch (error) {
     res.status(500).json({
            message: error.message || error,
            error:true,
            success: false,
        }); 
  }
}

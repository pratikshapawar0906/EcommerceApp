import mongoose from "mongoose";


const cartProductSchema= new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { 
        type: Number,
         default: 1 
    },
     userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: "",
        ref:"User"
      },
    ],
},
{
    timestamps: true,
  }
)

const CartProduct=mongoose.model("cartProduct", cartProductSchema);
 export default CartProduct
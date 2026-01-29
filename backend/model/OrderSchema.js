import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: "",
        ref:"User"
      },
    ],
    orderId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Provide orderId"],
        unique: true,
      },
    ],
    product_details:{
        name:String,
        image:Array
    },
    paymentId :{
        type:String,
        dafault:""
    },
    payment_status :{
       type:String,
        dafault:""
    },
    subTotalAmt:{
        type:Number,
        default:0
    },
    delivery_address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    totalAmt:{
        type:Number,
        default:0
    },
    
    
  },
  {
    timestamps: true,
  }
  
);

const Order=mongoose.model("Order", orderItemSchema);
export default Order
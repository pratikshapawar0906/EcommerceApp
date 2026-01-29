import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    mobile: { type: String },
    addressLine1: { 
        type: String,
        default:""
     },
    addressLine2: { 
        type: String,
        default:""
     },
    city: { 
        type: String,
        default:""
     },
    state: { 
        type: String,
        default:""
     },
    pincode: { 
        type: String 
    },
    country: { 
        type: String, 
        default: "India"
    },
    mobile: {
      type: Number,
      unique: true,
      sparse: true,
      default:null
    },
     status: {
      type: Boolean,   
      default: true,
    },
    userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: "",
      },
    ],
    isDefault: { type: Boolean, default: false },
  },
   {
    timestamps: true,
  }
);





const Address =  mongoose.model("Address", addressSchema);
 export default Address
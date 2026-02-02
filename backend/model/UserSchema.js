import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type :String,
        required :[true, "Provide name"],
         trim: true,
    },
    
    email: {
      type: String,
      required: [true, "Provide email"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Provide password"],
      select: true, // never return password
    },
    avatar:{
      type: String,
      default:""
    },

    mobile: {
      type: Number,
      unique: true,
      sparse: true,
    },

    refresh_token: {
      type: String,
      select: false,
      default:""
    },

    verify_email: {
      type: Boolean,
      default: false,
      
    },

    last_login_date: {
      type: Date,
      select: false,
      default:''
    },

    address_detail: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],

    shopping_cart: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartProduct",
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },

    order_history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    otp: {
      type: String,
     
    },

    otp_expiry: {
      type: Date,
      
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
},
  {
    timestamps: true,
  }
)

const User= mongoose.model("User", userSchema);
 export default User
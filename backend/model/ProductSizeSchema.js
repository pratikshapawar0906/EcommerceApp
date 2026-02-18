import mongoose from "mongoose";


const ProductSizeSchema= new mongoose.Schema({
    name:{
        type :String,
        required :true,   
    },
    dateCreated:{
      type:Date,
      default:Date.now,
    }
},
  {
    timestamps: true,
  }
)

const Size= mongoose.model("ProductSize",ProductSizeSchema);
export default Size
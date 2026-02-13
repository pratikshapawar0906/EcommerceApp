import mongoose from "mongoose";


const ProductRAMSSchema= new mongoose.Schema({
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

const Rams= mongoose.model("ProductRAMS",ProductRAMSSchema);
export default Rams
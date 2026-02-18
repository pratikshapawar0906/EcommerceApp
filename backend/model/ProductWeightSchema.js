import mongoose from "mongoose";


const ProductWeightSchema= new mongoose.Schema({
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

const Weight= mongoose.model("ProductWeight",ProductWeightSchema);
export default Weight
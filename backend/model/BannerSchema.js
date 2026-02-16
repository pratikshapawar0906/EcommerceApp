import mongoose from "mongoose";


const BannerSchema=new mongoose.Schema({
     images:[
      {
        type: String,
      }
    ],
},{
     timestamps: true,
})

const Banner= mongoose.model("Banner", BannerSchema);
export default Banner;
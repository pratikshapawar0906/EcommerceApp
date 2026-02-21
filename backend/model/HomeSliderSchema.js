import mongoose from "mongoose";


const HomeSliderSchema=new mongoose.Schema({
     images:[
      {
        type: String,
      }
    ],
},{
     timestamps: true,
})

const HomeSlider= mongoose.model("HomeSlider", HomeSliderSchema);
export default HomeSlider;
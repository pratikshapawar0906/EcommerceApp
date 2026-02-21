import mongoose from "mongoose";


const BannerSchema=new mongoose.Schema({
    bannerTitle:{
      type:String,
      default:'',
      require:true
    },
    catId:{
      type:String,
      default:'',
      require:true
    },
    subCatId:{
      type:String,
      default:'',
      require:true
    },
    thridCatId:{
      type:String,
      default:'',
      require:true
    },
    price:{
      type:Number,
      default:''
    },
    // align:{
    //   type:number,
    //   default:''
    // },
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
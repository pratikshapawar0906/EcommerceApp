import mongoose from "mongoose";



const ProductSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  images:[
    {
        type:String,
       required:true,
    }
  ],
  brand:{
    type:String,
    default:"",
  },
  price:{
    type:String,
    default:0,
  },
  oldPrice:{
    type:String,
    default:0
  },
  catName:{
    type:String,
    default:'',
  },
  catId:{
    type:String,
    default:'',
  },
  subCatId:{
    type:String,
    default:'',
  },
  subCat:{
    type:String,
    default:'',
  },
  thridSubCat:{
    type:String,
    default:'',
  },
  thridSubCatId:{
    type:String,
    default:'',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    // required: true
  },
  countInStock:{
    type:Number,
    required:true
  },
  rating:{
    type:Number,
    default:0
  },
  isFeatured:{
    type:Boolean,
    default:false
  },
  discount:{
    type:Number,
    required:true,
  },
  productRam:[
    {
        type:String,
        default:null
    }
  ],
  size:[
    {
        type:String,
        default:null
    }
  ],
  productWeight:[
    {
        type:String,
        default:null
    }
  ],
  location:[
    {
        value:{
            type:String,
        },
        label:{
            type:String,
        }
    },
  ],
  dateCreated:{
    type:Date,
    default:Date.now,
  }
},{
    timestamps:true
}
)


const Product=mongoose.model("Product", ProductSchema);
export default Product
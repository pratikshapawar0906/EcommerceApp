import mongoose from "mongoose";


const BlogSchema=new mongoose.Schema({
    blogTitle:{
      type:String,
      default:'',
    },
    images:[
      {
        type: String,
      }
    ],
    descripation:{
      type:String,
      default:'',
    },
    
},{
     timestamps: true,
})

const Blog= mongoose.model("Blog", BlogSchema);
export default Blog;
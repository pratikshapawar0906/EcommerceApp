import cloudinary from "../middleware/cloudinary.js";
import fs from 'fs'
import Blog from "../model/BlogSchema.js";

var imagesArr=[];



export const uploadImagesController = async (req, res) => {
  try {
      imagesArr=[];
  
    
     const images=req.files;

    
      if (!images || images.length === 0) {
        return res.status(400).json({
          message: "Image required",
          error: true,
        });
      }

      
      const options={
        user_filename:true,
        unique_filename:false,
        overwrite:false,
      };

     for(let i=0;i<images?.length; i++){
    

        const result =await cloudinary.uploader.upload(
          images[i].path,
          options,
        );
         imagesArr.push(result.secure_url);
         fs.unlinkSync(images[i].path);
        console.log(req.files[i].filename)
     }

   

    return  res.status(200).json({
      
      images:imagesArr
    });

  } catch (error) {
    console.error("Imges error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const createBlogController = async (req, res) => {
   try {
     let blog=new Blog({
        blogTitle: req.body.blogTitle, 
        images:imagesArr,
        descripation:req.body.descripation   
     })
     
     if(!blog){
        return  res.status(400).json({
            message:"Blog not created",
            error:true,
            success:false
        })
     }

     blog = await blog.save();
   
     imagesArr=[];

    return  res.status(200).json({
        message:"Blog Created",
       success: true,
       error:false,
       data:blog
    });

  } catch (error) {
    console.error("Blog Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}


export const removeImageFromCloudinary = async (req, res) => {
  try {
    
    const imgUrl=req.query.img;

  const urlArr=imgUrl.split("/"); 
  const image =urlArr[urlArr.length -1];
  const imageName=image.split(".")[0]; 

  const result= await cloudinary.uploader.destroy(
    imageName,
    
  )


    return res.status(200).json({
         success: true,
         error:false,
         message: "Remove Image  Successfully",
         Image:result
         
    });
   
   
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
      error:true,
    });
  }
  
}


export const getSingleBlogController = async (req, res) => {
    try {

        const  blog= await Blog.findById(req.params.id)

        if(!blog){
            return res.status(400).json({
                message:"Blog not found",
                success:false,
                error:true
            })
        }

        return  res.status(200).json({
          message:"Getting Blog Successfully",
          success: true,
          error:false,
          data:blog
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || error,
            error:true,
        });
    }
}
export const getAllBlogController = async (req, res) => {
  try {
         
        const page=parseInt(req.query.page) || 1;
        const perPage=parseInt(req.query.perPage);
        const totalPosts= await Blog.countDocuments();
        const totalPages=Math.ceil(totalPosts/perPage);
       
        if(page > totalPages ){
           res.status(400).json({
               message:"Page not found"
           })
        }

        const blog=await Blog.find()
           .skip((page-1) * perPage)
           .limit(perPage)
           .exec(); 
    
        if(!blog){
            return res.status(404).json({
                message:"Imges not found in Blog",
                error:true,
                success: false,
            })
        } 


    return  res.status(200).json({
      message:"Getting Blog Successfully",
      success: true,
      error:false,
      totalPages:totalPages,
      page:page,
      data:blog
    });
    
  } catch (error) {
      console.error("Blog Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}
export const updateBlogController = async (req, res) => {
    try {

        const Blog=await  Blog.findByIdAndUpdate(
            req.params.id,
            {
               images:imagesArr.length > 0 ?  imagesArr[0] :req.body.imagesArr, 
               blogTitle: req.body.blogTitle, 
               descripation:req.body.descripation
            },
            {new :true}
        )   
     
        if(!Blog){
           return  res.status(400).json({
               message:"Blog not found",
               error:true,
               success:false
           })
        }

        imagesArr=[];

        return  res.status(200).json({
          message:" Blog Updated Successfully",
          success: true,
          error:false,
          data:Blog,
        });
     
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || error,
            error:true,
        }); 
    }
}

export const deleteBlogController = async (req, res) => {
    try {
      
        const blog=await Blog.findById(req.params.id);

        if(!blog){
           return res.status(404).json({
           success: false,
           error: true,
           message: "Home slider not found",
      });
          
        }

        const images=blog.images;

        for(const img of images){
             const imgUrl=img;
             const urlArr=imgUrl.split("/"); 
             const image =urlArr[urlArr.length -1];
             const imageName=image.split(".")[0];     
             
            if(imageName){
               await cloudinary.uploader.destroy(imageName);
            }
        }

         const deletedCat=await Blog.findByIdAndDelete(req.params.id);

         if(!deletedCat){
            res.status(400).json({
               message:" Blog not found",
               success: false,
               error: true,
            })
         }

        return  res.status(200).json({
          message:" Blog Delete Successfully",
          success: true,
          error:false,
          
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || error,
            error:true,
        }); 
    }
}
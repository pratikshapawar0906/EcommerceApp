import cloudinary from "../middleware/cloudinary.js";
import fs from 'fs'
import Banner from "../model/BannerSchema.js";

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

export const createBannerController = async (req, res) => {
   try {
      

     let banner=new Banner({
       bannerTitle: req.body.bannerTitle, 
        images:imagesArr,
        catId:req.body.catId,
        subCatId:req.body.subCatId,
        thridCatId:req.body.thridCatId,
        price:req.body.price,
        align:req.body.align,

        
     })
     
     if(!banner){
        return  res.status(400).json({
            message:"Banner not created",
            error:true,
            success:false
        })
     }

     banner = await banner.save();
   
     imagesArr=[];

    return  res.status(200).json({
        message:"Banner Created",
       success: true,
       error:false,
       data:banner
    });

  } catch (error) {
    console.error("Banner Error:", error);
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


export const getSingleBannerController = async (req, res) => {
    try {

        const  banner= await Banner.findById(req.params.id)

        if(!banner){
            return res.status(400).json({
                message:"Banner not found",
                success:false,
                error:true
            })
        }

        return  res.status(200).json({
          message:"Getting Banner Successfully",
          success: true,
          error:false,
          data:banner
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || error,
            error:true,
        });
    }
}
export const getAllBannerController = async (req, res) => {
  try {
       
        const banner=await Banner.find({
          
        }) 
    
        if(!banner){
            return res.status(404).json({
                message:"Imges not found in Banner",
                error:true,
                success: false,
            })
        } 


    return  res.status(200).json({
      message:"Getting Banner Successfully",
      success: true,
      error:false,
      data:banner
    });
    
  } catch (error) {
      console.error("Banner Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}
export const updateBannerController = async (req, res) => {
    try {

        const banner=await  Banner.findByIdAndUpdate(
            req.params.id,
            {
               images:imagesArr.length > 0 ?  imagesArr[0] :req.body.imagesArr,
               catId:req.body.catId,
               bannerTitle: req.body.bannerTitle, 
               subCatId:req.body.subCatId,
               thridCatId:req.body.thridCatId,
               price:req.body.price,
               align:req.body.align,
            },
            {new :true}
        )   
     
        if(!banner){
           return  res.status(400).json({
               message:"Banner not found",
               error:true,
               success:false
           })
        }

        imagesArr=[];

        return  res.status(200).json({
          message:" Banner Updated Successfully",
          success: true,
          error:false,
          data:banner,
        });
     
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || error,
            error:true,
        }); 
    }
}

export const deleteBannerController = async (req, res) => {
    try {
      
        const banner=await Banner.findById(req.params.id);

        if(!banner){
           return res.status(404).json({
           success: false,
           error: true,
           message: "Home slider not found",
      });
          
        }

        const images=banner.images;

        for(const img of images){
             const imgUrl=img;
             const urlArr=imgUrl.split("/"); 
             const image =urlArr[urlArr.length -1];
             const imageName=image.split(".")[0];     
             
            if(imageName){
               await cloudinary.uploader.destroy(imageName);
            }
        }

      

         const deletedCat=await Banner.findByIdAndDelete(req.params.id);

         if(!deletedCat){
            res.status(400).json({
               message:" Banner not found",
               success: false,
               error: true,
            })
         }

        return  res.status(200).json({
          message:" Banner Delete Successfully",
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
import cloudinary from "../middleware/cloudinary.js";
import fs from 'fs'
import HomeSlider from "../model/HomeSliderSchema.js";

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

export const createHomeSliderController = async (req, res) => {
   try {
      

     let homeSlider=new HomeSlider({
        images:imagesArr,
     })
     
     if(!homeSlider){
        return  res.status(400).json({
            message:"HomeSlider not created",
            error:true,
            success:false
        })
     }

     homeSlider = await homeSlider.save();
   
     imagesArr=[];

    return  res.status(200).json({
        message:"HomeSlider Created",
       success: true,
       error:false,
      HomeSlider:homeSlider
    });

  } catch (error) {
    console.error("HomeSlider Error:", error);
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


export const getSingleHomeSliderController = async (req, res) => {
    try {

        const  homeSlider= await HomeSlider.findById(req.params.id)

        if(!homeSlider){
            return res.status(400).json({
                message:"HomeSlider not found",
                success:false,
                error:true
            })
        }

        return  res.status(200).json({
          message:"Getting HomeSlider Successfully",
          success: true,
          error:false,
          HomeSlider:homeSlider
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || error,
            error:true,
        });
    }
}
export const getAllHomeSliderController = async (req, res) => {
  try {
    // const userId=req.userId;    
        const homeSlider=await HomeSlider.find({
            // userId:userId,
        }) 
    
        if(!homeSlider){
            return res.status(404).json({
                message:"Imges not found in HomeSlider",
                error:true,
                success: false,
            })
        } 


    return  res.status(200).json({
      message:"Getting HomeSlider Successfully",
      success: true,
      error:false,
      data:homeSlider
    });
    
  } catch (error) {
      console.error("HomeSlider Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}
export const updateHomeSliderController = async (req, res) => {
    try {

        const homeSlider=await  HomeSlider.findByIdAndUpdate(
            req.params.id,
            {
               images:imagesArr.length > 0 ?  imagesArr[0] :req.body.imagesArr,
            },
            {new :true}
        )   
     
        if(!homeSlider){
           return  res.status(400).json({
               message:"HomeSlider not found",
               error:true,
               success:false
           })
        }

        imagesArr=[];

        return  res.status(200).json({
          message:" HomeSlider Updated Successfully",
          success: true,
          error:false,
          HomeSlider:homeSlider,
        });
     
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || error,
            error:true,
        }); 
    }
}

export const deleteHomeSliderController = async (req, res) => {
    try {
      
        const homeSlider=await HomeSlider.findById(req.params.id);

        if(!homeSlider){
           return res.status(404).json({
           success: false,
           error: true,
           message: "Home slider not found",
      });
          
        }

        const images=homeSlider.images;

        for(const img of images){
             const imgUrl=img;
             const urlArr=imgUrl.split("/"); 
             const image =urlArr[urlArr.length -1];
             const imageName=image.split(".")[0];     
             
            if(imageName){
               await cloudinary.uploader.destroy(imageName);
            }
        }

      

         const deletedCat=await HomeSlider.findByIdAndDelete(req.params.id);

         if(!deletedCat){
            res.status(400).json({
               message:" HomeSlider not found",
               success: false,
               error: true,
            })
         }

        return  res.status(200).json({
          message:" HomeSlider Delete Successfully",
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
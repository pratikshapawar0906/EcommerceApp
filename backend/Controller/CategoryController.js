import Category from "../model/categorySchema.js"

import fs from 'fs'
import cloudinary from "../middleware/cloudinary.js";


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

export const createCategoryController = async (req, res) => {
   try {
      

     let category=new Category({
        name: req.body.name,
        images:imagesArr,
        // color:req.body.color,
        parentId:req.body.parentId,
        parentCatName:req.body. parentCatName
     })
     
     if(!category){
        return  res.status(400).json({
            message:"Category not created",
            error:true,
            success:false
        })
     }

     category = await category.save();
   
     imagesArr=[];

    return  res.status(200).json({
        message:"Category Created",
       success: true,
       error:false,
      category:category
    });

  } catch (error) {
    console.error("Category Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getAllCategoryController = async (req, res) => {
  try {
    const categories = await Category.find();
    const categoryMap = {};

    // Step 1: Create map
    categories.forEach(cat => {
      categoryMap[cat._id.toString()] = {
        ...cat._doc,
        children: []
      };
    });

    const rootCategories = [];

    // Step 2: Build tree safely
    categories.forEach(cat => {
      if (cat.parentId) {
        const parentId = cat.parentId.toString();

        if (categoryMap[parentId]) {
          categoryMap[parentId].children.push(
            categoryMap[cat._id.toString()]
          );
        } else {
          // parent not found → treat as root
          rootCategories.push(categoryMap[cat._id.toString()]);
        }
      } else {
        rootCategories.push(categoryMap[cat._id.toString()]);
      }
    });

    return res.status(200).json({
      message: "Getting Category Successfully",
      success: true,
      error: false,
      data: rootCategories
    });

  } catch (error) {
    console.error("Category Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
      error: true,
    });
  }
};


export const getCategoriesController = async (req, res) => {
    try {

      const categoryCount=await Category.countDocuments({parentId:undefined});

      if(!categoryCount){
        res.status(400).json({
            success:false,
            error:true,
        })
      }

      return  res.status(200).json({
      message:"Getting Categories Successfully",
      success: true,
      error:false,
      categoryCount:categoryCount,
    });
    
        
    } catch (error) {
   
        res.status(500).json({
            success: false,
            message: error.message || error,
            error:true,
        });
    }
}

export const getSubCategoriesController = async (req, res) => {
    try {

      const subCategoryCount=await Category.find();

       const subCatList=[];

      if(!subCategoryCount){
        res.status(400).json({
            success:false,
            error:true,
        })
      }else{
       
        for(let cat of subCategoryCount){
            if(cat.parentId !== undefined){
                subCatList.push(cat);
            }
        }
      }
      
   
      return  res.status(200).json({
      message:"Getting SUb Categories Successfully",
      success: true,
      error:false,
      subCategoryCount:subCatList.length,
    });
    
        
    } catch (error) {
   
        res.status(500).json({
            success: false,
            message: error.message || error,
            error:true,
        });
    }
}

export const getSingleCategoryController = async (req, res) => {
    try {

        const  category= await Category.findById(req.params.id)

        if(!category){
            return res.status(400).json({
                message:"category not found",
                success:false,
                error:true
            })
        }

        return  res.status(200).json({
          message:"Getting Category Successfully",
          success: true,
          error:false,
          category:category
        });
        
    } catch (error) {
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

export const deleteCategoryController = async (req, res) => {
    try {
      
        const category=await Category.findById(req.params.id);

        if(!category){
           return res.status(404).json({
           success: false,
           error: true,
           message: "Category not found",
      });

          
        }

        const images=category.images;

        for(const img of images){
             const imgUrl=img;
             const urlArr=imgUrl.split("/"); 
             const image =urlArr[urlArr.length -1];
             const imageName=image.split(".")[0];     
             
            if(imageName){
               await cloudinary.uploader.destroy(imageName);
            }
        }

       

        const subCategory=await Category.find({
            parentId:req.params.id
        })
       
         for(let i=0;i<subCategory.length;i++){
            console.log(subCategory[i]._id)

            const thridSubCategory=await  Category.find({
                 parentId:subCategory[i]._id
            });
     
            for(let i=0;i<thridSubCategory.length;i++){
                const  deletedThridSubCat=await Category.findByIdAndDelete(
                    thridSubCategory[i]._id
                )
            }
            const deleteSubCategory=await Category.findByIdAndUpdate(subCategory[i]._id);

         }

         const deletedCat=await Category.findByIdAndDelete(req.params.id);

         if(!deletedCat){
            res.status(400).json({
               message:" Category not found",
               success: false,
               error: true,
            })
         }

        return  res.status(200).json({
          message:" Category Delete Successfully",
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

export const updateCategoryController = async (req, res) => {
    try {

        const category=await  Category.findByIdAndUpdate(
            req.params.id,
            {
               name:req.body?.name,
               images:imagesArr.length > 0 ?  imagesArr[0] :req.body.imagesArr,
               color:req.body?.color,
               parentId:req.body?.parentId,
               parentCatName:req.body?.parentCatName
            },
            {new :true}
        )   
     
        if(!category){
           return  res.status(400).json({
               message:"Category not found",
               error:true,
               success:false
           })
        }

        imagesArr=[];

        return  res.status(200).json({
          message:" Category Updated Successfully",
          success: true,
          error:false,
          category:category,
        });
     
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || error,
            error:true,
        }); 
    }
}
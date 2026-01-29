import Product from "../model/ProductSchema.js"
import cloudinary from "../middleware/cloudinary.js";
import fs from "fs"



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

export const createProduct=async(req,res)=>{
   try {
     const product=await new Product({
       name: req.body.name,
       description: req.body.description,
       images: imagesArr,
       brand: req.body.brand || "",
       price: Number(req.body.price),
       oldPrice: Number(req.body.oldPrice),
       catName: req.body.catName,
       catId: req.body.catId,
       subCatId: req.body.subCatId,
       subCat: req.body.subCat,
       thridSubCat: req.body.thridSubCat,
       thridSubCatId: req.body.thridSubCatId,
       category: req.body.category,
       countInStock: Number(req.body.countInStock),
       rating: Number(req.body.rating) || 0,
       isFeatured: req.body.isFeatured || false,
       discount: Number(req.body.discount),
       productRam: req.body.productRam,
       size: req.body.size,
       productWeight: req.body.productWeight,
       location: req.body.location,
     }).save();

    

     if(!product){
        res.status(400).json({
          success: false,
          message: "Product not created",
          error:true,
        })
     }
     
     imagesArr=[];
    
    return  res.status(200).json({
      message:"Product Created Successfully",
      success: true,
      error:false,
      product:product,
    });

   } catch (error) {

    res.status(500).json({
         success: false,
         message: error.message || error,
         error:true,
    }); 
   }
}

export const getAllCategoryController = async (req, res) => {
  try {

    const page=parseInt(req.query.page) || 1;
    const perPage=parseInt(req.query.perPage);
    const totalPosts= await Product.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);

     if(page > totalPages ){
        res.status(400).json({
            message:"Page not found"
        })
     }

    const product= await Product.find().populate("category")
    .skip((page-1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!product){
        res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }
    

    return  res.status(200).json({
      message:"Getting Product Successfully",
      success: true,
      error:false,
      totalPages:totalPages,
      page:page,
      data:product,
    });
    
  } catch (error) {
      console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getAllCatByCatIdController = async (req, res) => {
  try {

    const page=parseInt(req.query.page) || 1;
    const perPage=parseInt(req.query.perPage) || 10000 ;
    const totalPosts= await Product.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);

     if(page > totalPages ){
        res.status(400).json({
            message:"Page not found"
        })
     }

    const product= await Product.find({
        catId:req.params.id
    }).populate("category")
    .skip((page-1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!product){
        res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }
    

    return  res.status(200).json({
      message:"Getting Product Successfully",
      success: true,
      error:false,
      totalPages:totalPages,
      page:page,
      data:product,
    });
    
  } catch (error) {
      console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getAllCatByCatNameController = async (req, res) => {
  try {

    const page=parseInt(req.query.page) || 1;
    const perPage=parseInt(req.query.perPage) || 10000 ;
    const totalPosts= await Product.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);

     if(page > totalPages ){
        res.status(400).json({
            message:"Page not found"
        })
     }

    const product= await Product.find({
        catName:req.query.catName
    }).populate("category")
    .skip((page-1) * perPage)
    .limit(perPage)
    .exec();
    
    if(product.length ===0){
      return  res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }
    

    return  res.status(200).json({
      message:"Getting Product Successfully",
      success: true,
      error:false,
      data:product,
      totalPages:totalPages,
      page:page,
     
    });
    
  } catch (error) {
      console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}


export const getAllCatBySubCatIdController = async (req, res) => {
  try {

    const page=parseInt(req.query.page) || 1;
    const perPage=parseInt(req.query.perPage) || 10000 ;
    const totalPosts= await Product.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);

     if(page > totalPages ){
        res.status(400).json({
            message:"Page not found"
        })
     }

    const product= await Product.find({
        subCatId:req.params.id
    }).populate("category")
    .skip((page-1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!product){
        res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }
    

    return  res.status(200).json({
      message:"Getting Product Successfully",
      success: true,
      error:false,
      totalPages:totalPages,
      page:page,
      data:product,
    });
    
  } catch (error) {
      console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getAllCatBySubCatNameController = async (req, res) => {
  try {

    const page=parseInt(req.query.page) || 1;
    const perPage=parseInt(req.query.perPage) || 10000 ;
    const totalPosts= await Product.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);

     if(page > totalPages ){
        res.status(400).json({
            message:"Page not found"
        })
     }

    const product= await Product.find({
        subCat:req.query.subCat
    }).populate("category")
    .skip((page-1) * perPage)
    .limit(perPage)
    .exec();
    
    if(product.length ===0){
      return  res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }
    

    return  res.status(200).json({
      message:"Getting Product Successfully",
      success: true,
      error:false,
      data:product,
      totalPages:totalPages,
      page:page,
     
    });
    
  } catch (error) {
      console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getAllCatByThridSubCatIdController = async (req, res) => {
  try {

    const page=parseInt(req.query.page) || 1;
    const perPage=parseInt(req.query.perPage) || 10000 ;
    const totalPosts= await Product.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);

     if(page > totalPages ){
        res.status(400).json({
            message:"Page not found"
        })
     }

    const product= await Product.find({
       thridSubCatId:req.params.id
    }).populate("category")
    .skip((page-1) * perPage)
    .limit(perPage)
    .exec();
    
    if(!product){
        res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }
    

    return  res.status(200).json({
      message:"Getting Product Successfully",
      success: true,
      error:false,
      totalPages:totalPages,
      page:page,
      data:product,
    });
    
  } catch (error) {
      console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getAllCatByThridSubCatNameController = async (req, res) => {
  try {

    const page=parseInt(req.query.page) || 1;
    const perPage=parseInt(req.query.perPage) || 10000 ;
    const totalPosts= await Product.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);

     if(page > totalPages ){
        res.status(400).json({
            message:"Page not found"
        })
     }

    const product= await Product.find({
        thridSubCat:req.query.thridSubCat
    }).populate("category")
    .skip((page-1) * perPage)
    .limit(perPage)
    .exec();
    
    if(product.length ===0){
      return  res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }
    

    return  res.status(200).json({
      message:"Getting Product Successfully",
      success: true,
      error:false,
      data:product,
      totalPages:totalPages,
      page:page,
     
    });
    
  } catch (error) {
      console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getAllProductByPriceController = async (req, res) => {
  try {

    let productList=[];

    if(req.query.catId !== "" && req.query.catId !== undefined){
      const productListArr=await Product.find({
        catId:req.query.catId,
      }).populate("category")
        productList =productListArr;
    }

    if(req.query.subCatId !== "" && req.query.subCatId !== undefined){
      const productListArr=await Product.find({
        subCatId:req.query.subCatId,
      }).populate("category")
      productList =productListArr;    
    }

    if(req.query.thridSubCatId !== "" && req.query.thridSubCatId !== undefined){
      const productListArr=await Product.find({
        thridSubCatId:req.query.thridSubCatId,
      }).populate("category")
      productList =productListArr;    
    }

    const filterProducts=productList.filter((product)=>{
      if(req.query.minPrice && product.price < parseInt(+req.query.minPrice)){
        return false;
      }
       if(req.query.maxPrice && product.price < parseInt(+req.query.maxPrice)){
        return false;
      }
      return true;
    })

    return  res.status(200).json({
      message:"Getting Product by Price Successfully",
      success: true,
      error:false,
      products:filterProducts,
     
    });
    
  } catch (error) {
    console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getAllProductRatingController = async (req, res) => {
  try {

    const page=parseInt(req.query.page) || 1;
    const perPage=parseInt(req.query.perPage) || 10000 ;
    const totalPosts= await Product.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);

     if(page > totalPages ){
        res.status(400).json({
            message:"Page not found"
        })
     }

     let product=[];
     if( req.query.catId !== undefined){ 
      product= await Product.find({
        rating:req.query.rating,
        catId:req.query.catId,
      }).populate("category")
      .skip((page-1) * perPage)
      .limit(perPage)
      .exec();
     }

     if( req.query.thridSubCatId !== undefined){ 
      product= await Product.find({
        rating:req.query.rating,
        thridSubCatId:req.query.thridSubCatId,
      }).populate("category")
      .skip((page-1) * perPage)
      .limit(perPage)
      .exec();
     }

     if( req.query.subCatId !== undefined){ 
      product= await Product.find({
        rating:req.query.rating,
        subCatId:req.query.subCatId,
      }).populate("category")
      .skip((page-1) * perPage)
      .limit(perPage)
      .exec();
     }
    
    
    if(product.length ===0){
      return  res.status(400).json({
          message:"Product is not available",
          error:true,
          success:false
      })
    }
    

    return  res.status(200).json({
      message:"Getting Product Successfully",
      success: true,
      error:false,
      data:product,
      totalPages:totalPages,
      page:page,
     
    });
    
  } catch (error) {
      console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getAllProductCountController = async (req, res) => {
  try {

    const productCount= await Product.countDocuments();
    
    if(!productCount){
      return res.status(400).json({
        success: false,
        error:true,
      })
    }   

    return  res.status(200).json({
      message:" Product Counting Successfully",
      success: true,
      error:false,
      productCount:productCount   
    });
    
  } catch (error) {
      console.error("Product Counting  Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getAllProductFeaturedController = async (req, res) => {
  try {

    const product= await Product.find({
        isFeatured:true
    }).populate("category")
    
    if(product.length === 0){
      return  res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }

    return  res.status(200).json({
      message:" Product Fetured Successfully",
      success: true,
      error:false,
      product:product  
    });
    
  } catch (error) {
      console.error("Product Fetured  Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const deleteProductController = async (req, res) => {
  try {

    const product= await Product.findById(req.params.id).populate("category");
    const images=product.images;

    for(img of images){
      const imgUrl=img;
      const urlArr=imgUrl.split("/");
      const image=urlArr[urlArr.length-1];

      const imageName=image.split(".")[0];

      if(imageName){
        cloudinary.uploader.destroy(imageName)
      }
    }

    const deleteProduct =await Product.findByIdAndDelete(req.params.id);
    
    if(!deleteProduct){
      return  res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }

    return  res.status(200).json({
      message:" Product Delete Successfully",
      success: true,
      error:false,
    });
    
  } catch (error) {
      console.error("Product Deleting Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const getProductController = async (req, res) => {
  try {

    const product= await Product.findById(req.params.id).populate("category");
   
    
    if(!product){
      return  res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }

    return  res.status(200).json({
      message:" Product Successfully",
      success: true,
      error:false,
      product:product
    });
    
  } catch (error) {
      console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}

export const removeImageFromProductController = async (req, res) => {
  try {
    const imgUrl=req.query.img;

    const urlArr=imgUrl.split("/"); 
    const image =urlArr[urlArr.length -1];
    const imageName=image.split(".")[0]; 
  
    const result= await cloudinary.uploader.destroy(
      imageName,
    )
  
     return  res.status(200).json({
      message:" Delete Product Image Successfully",
      success: true,
      error:false,
      result:result
    })

  } catch (error) {
    console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
   
  
}

export const updateProductController = async (req, res) => {
  try {

    const product=await  Product.findByIdAndUpdate(
      req.params.id,
      {
       name: req.body.name,
       description: req.body.description,
       images: imagesArr,
       brand: req.body.brand || "",
       price: Number(req.body.price),
       oldPrice: Number(req.body.oldPrice),
       catName: req.body.catName,
       catId: req.body.catId,
       subCatId: req.body.subCatId,
       subCat: req.body.subCat,
       thridSubCat: req.body.thridSubCat,
       thridSubCatId: req.body.thridSubCatId,
       category: req.body.category,
       countInStock: Number(req.body.countInStock),
       rating: Number(req.body.rating) || 0,
       isFeatured: req.body.isFeatured || false,
       discount: Number(req.body.discount),
       productRam: req.body.productRam,
       size: req.body.size,
       productWeight: req.body.productWeight,
       location: req.body.location,
     },{
      new:true
     }
    );

   
    
    if(!product){
      return  res.status(400).json({
            message:"Product is not available",
            error:true,
            success:false
        })
    }

    imagesArr=[]

    return  res.status(200).json({
      message:" Product Updated Successfully",
      success: true,
      error:false,
      product:product
    });
    
  } catch (error) {
      console.error("Product Error:", error);
    res.status(500).json({
        success: false,
        message: error.message || error,
        error:true,
    });
  }
}
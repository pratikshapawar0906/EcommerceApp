import React, { useContext, useEffect, useState } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Component/UploadBox';
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { IoMdClose } from 'react-icons/io';
import Button from '@mui/material/Button';
import { IoMdCloudUpload } from "react-icons/io";
import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const EditProduct = () => {
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThridSubCat, setProductThridSubCat] = useState('');
    const [productFeatured, setProductFeatured] = useState('');
    const [productRams, setProductRams] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [productSize, setProductSize] = useState('');
    const[isLoading,setIsLoading]=useState(false);
     const [preview,setPreview]=useState([])
    const Context=useContext(MyContext)
    const[formField,setfromField]=useState({
        name:"", images:[],  
        description:"",  
        brand: "",
        price:"",
        oldPrice:"",
        catName:"",
        catId:"",
        subCatId:"",
        subCat:"",
        thridSubCat:"",
        thridSubCatId:"",
        // category:"",
        countInStock:"",
        rating:"",
        isFeatured:false,
        discount:"",
        productRam:[],
        size:[],
        productWeight:[],
        // location:[],   

      })

      const id=Context?.isOpenFullScreenPanel?.id;
      
        useEffect(()=>{
          fetchDataFromApi(`/api/product/getProduct/${id}`).then((res)=>{
              const product = res?.product;
                  setfromField({
                  name: product.name,
                  images: product.images,
                  description: product.description,
                  brand: product.brand,
                  price: product.price,
                  oldPrice: product.oldPrice,
                  catName: product.catName,
                  catId: product.catId,
                  subCatId: product.subCatId,
                  subCat: product.subCat,
                  thridSubCat: product.thridSubCat,
                  thridSubCatId: product.thridSubCatId,
                  countInStock: product.countInStock,
                  rating: product.rating,
                  isFeatured: product.isFeatured,
                  discount: product.discount,
                  productRam: product.productRam || [],
                  size: product.size || [],
                  productWeight: product.productWeight || [],
                });
            
                setPreview(product.images);
            
                setProductCat(product.catId);
                setProductSubCat(product.subCatId);
                setProductThridSubCat(product.thridSubCatId);
                setProductFeatured(product.isFeatured ? 10 : 20);
              });
         
        },[id]);

      const selectedCategory = Context?.catData?.find(
        cat => cat._id === productCat
      );
      
      const selectedSubCategory = selectedCategory?.children?.find(
        sub => sub._id === productSubCat
      );


    const handleChangeProductCat = (event) => {
     const selectedId = event.target.value;
     const selectedCat = Context.catData.find(cat => cat._id === selectedId);
   
     setProductCat(selectedId);
     setProductSubCat('');
     setProductThridSubCat('');
   
     setfromField(prev => ({
       ...prev,
       catId: selectedId,
       catName: selectedCat?.name || ''
     }));
   };

 
  const handleChangeProductSubCat = (event) => {
     const subId = event.target.value;
     const subCat = selectedCategory?.children?.find(
       sub => sub._id === subId
     );
   
     setProductSubCat(subId);
   
     setfromField(prev => ({
       ...prev,
       subCatId: subId,
       subCat: subCat?.name || ''
     }));
  };

   const handleChangeProductThridSubCat = (event) => {
    const thirdId = event.target.value;
    const thirdCat = selectedSubCategory?.children?.find(
      t => t._id === thirdId
    );
  
    setProductThridSubCat(thirdId);
  
    setfromField(prev => ({
      ...prev,
      thridSubCatId: thirdId,
      thridSubCat: thirdCat?.name || ''
    }));
  };

  const handleChangeProductFeatured = (event) => {
      const value = event.target.value === 10;

      setProductFeatured(value);
    
      setfromField(prev => ({
        ...prev,
        isFeatured: value
      }));
  };

  const handleChangeProductRams = (event) => {
    setProductRams(event.target.value);
      setfromField(prev => ({
      ...prev,
      productRam: [event.target.value]
    }));
  };

  const handleChangeProductWeight = (event) => {
     setProductWeight(event.target.value);

      setfromField(prev => ({
      ...prev,
      productWeight: [event.target.value]
    }));
  };

  const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);

      setfromField(prev => ({
      ...prev,
      size: [event.target.value]
    }));
  };

  const onChangeInput=(e)=>{
   const {name, value}=e.target
    setfromField(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const setPreviewFun=(previewArr)=>{
    setPreview((prev) => [...prev, ...previewArr]);

    setfromField((prev) => ({
      ...prev,
      images: [...prev.images, ...previewArr]
    }));
  }

   const removeImage=(image,index)=>{
        deleteData(`/api/product/deleteProductImage?img=${image}`).then(() => {
         const updated = preview.filter((_, i) => i !== index);
         setPreview(updated);
     
         setfromField(prev => ({
           ...prev,
           images: updated
         }));
       });
      }  

    const handleSubmit=(e)=>{
      e.preventDefault();
    
      setIsLoading(true);
          if(formField.name === "" ){
             Context.alertBox("error", "Please enter Product  name ");
              return false
          }
           if(preview?.length=== 0 ){
             Context.alertBox("error", "Please enter Product  image ");
              return  false
          }
          if(formField.description=== ""){
             Context.alertBox("error", "Please enter Product Descripation ");
              return  false
          }
          if(formField.brand=== "" ){
             Context.alertBox("error", "Please enter Product brand ");
              return  false
          }
          if(formField.productRam.length=== 0 ){
             Context.alertBox("error", "Please enter Product RAMS ");
              return  false
          }
          if(formField.catName=== "" ){
             Context.alertBox("error", "Please enter Product Category ");
              return  false
          }
          if(formField.countInStock=== 0 ){
             Context.alertBox("error", "Please enter Product Stocks");
              return  false
          }
          if(formField.discount=== "" ){
             Context.alertBox("error", "Please enter Product Discount");
              return  false
          }
          if(formField.oldPrice=== "" ){
             Context.alertBox("error", "Please enter Product Old Price ");
              return  false
          }
          if(formField.price=== "" ){
             Context.alertBox("error", "Please enter Product Price ");
              return  false
          }
          if(formField.rating=== 0 ){
             Context.alertBox("error", "Please enter Product Rating ");
              return  false
          }
           if(formField.subCat=== "" ){
             Context.alertBox("error", "Please enter Product Sub  Category ");
              return  false
          }
          editData(`/api/product/updateProduct/${id}`,formField).then((res)=>{
            if(res?.success){
               Context.alertBox( "success",  res?.message || "Created category  successful!" );
               setTimeout(()=>{
                setIsLoading(false)
                    Context.setIsOpenFullScreenPanel({
                    open:false,
                })
               
               },1500)
              
            } else {
               Context.alertBox( "error", res?.message || "Something went wrong!" );
                setIsLoading(false)
            }
          })
    }

  return (
    <>

     <section className="bg-gray-50 p-5">
        <form action="" className="form p-8 py-3" onSubmit={handleSubmit}>
            <div className="scroll max-h-[700px] overflow-y-scroll pr-4 pt-4">
            <div className="grid grid-cols-1 mb-3">
                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Name</h3>
                    <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                    onChange={onChangeInput} name="name" value={formField.name}    disabled={isLoading===true ? true:false}/>
                </div>
            </div>
            <div className="grid grid-cols-1 mb-3">
                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Description</h3>
                    <textarea type='text' className='w-full h-[130px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '
                    onChange={onChangeInput} name="description" value={formField.description}    disabled={isLoading===true ? true:false}/>
                </div>
            </div>
            <div className="grid grid-cols-4 mb-3 gap-4">
                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Category</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productCatDrop"
                      size='small'
                      className='w-full'
                      value={productCat}
                      label="Category"
                      onChange={handleChangeProductCat}
                    >
                    {
                        Context?.catData?.length !==0 && Context?.catData?.map((item,index)=>{
                          return(
                           
                             <MenuItem  key={index} value={item?._id} >{item?.name}</MenuItem>
                     
                          )
                        })
                    }
                    </Select>
                </div>

                  <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black ">Product Sub Category</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productSubCatDrop"
                      size='small'
                      className='w-full'
                      value={productSubCat}
                      label="Category"
                      onChange={handleChangeProductSubCat}
                    >
                    {
                    selectedCategory?.children?.map((subCat, index) => (
                      <MenuItem key={index} value={subCat._id}>
                        {subCat.name}
                      </MenuItem>
                    ))}
                                        
                    </Select>
                 </div>

                  <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black ">Product Thrid sub Category</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productSubCatDrop"
                      size='small'
                      className='w-full'
                      value={productThridSubCat}
                      label="Category"
                      onChange={handleChangeProductThridSubCat}
                    >
                    {
                     selectedSubCategory?.children?.map((thirdCat, index) => (
                      <MenuItem key={index} value={thirdCat._id}>
                        {thirdCat.name}
                      </MenuItem>
                    ))}
                      
                    </Select>
                 </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Price</h3>
                    <input type='Number' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '
                     onChange={onChangeInput} name="price" value={formField.price}    disabled={isLoading===true ? true:false}/>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Old Price</h3>
                    <input type='Number' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '
                     onChange={onChangeInput} name="oldPrice" value={formField.oldPrice}    disabled={isLoading===true ? true:false}/>
                </div> 

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Is Featured?</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productCatDrop"
                      size='small'
                      className='w-full'
                      value={productFeatured}
                      label="Category"
                      onChange={handleChangeProductFeatured}
                    >
                     
                      <MenuItem value={10}>True</MenuItem>
                      <MenuItem value={20}>False</MenuItem>
                      
                    </Select>
                </div>    

                 <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Stock</h3>
                    <input type='Number' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '
                     onChange={onChangeInput} name="countInStock" value={formField.countInStock}    disabled={isLoading===true ? true:false}/>
                </div>  

                 <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Brand</h3>
                    <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '
                     onChange={onChangeInput} name="brand" value={formField.brand}    disabled={isLoading===true ? true:false}/>
                </div>         
            </div>
            <div className="grid grid-cols-4 mb-3 gap-4">
               

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product Discount</h3>
                    <input type='Number' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm '
                     onChange={onChangeInput} name="discount" value={formField.discount}    disabled={isLoading===true ? true:false}/>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Product RAMS</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productCatDrop"
                      size='small'
                      className='w-full'
                      value={productRams}
                      label="Category"
                      onChange={handleChangeProductRams}
                    >
                      <MenuItem value="4GB">4GB</MenuItem>
                      <MenuItem value="6GB">6GB</MenuItem>
                      <MenuItem value="8GB">8GB</MenuItem>
                     
                    </Select>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black ">Product Weight</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productSubCatDrop"
                      size='small'
                      className='w-full'
                      value={productWeight}
                      label="Category"
                      onChange={handleChangeProductWeight}
                    >
                      <MenuItem value={''}>None</MenuItem>
                      <MenuItem value={"2kG"}>2kG</MenuItem>
                      <MenuItem value={"4kG"}>4kG</MenuItem>
                      <MenuItem value={"8kG"}>8kG</MenuItem>
                    </Select>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black ">Product Size</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productSubCatDrop"
                      size='small'
                      className='w-full'
                      value={productSize}
                      label="Category"
                      onChange={handleChangeProductSize}
                    >
                      <MenuItem value={''}>None</MenuItem>
                      <MenuItem value={'XS'}>XS</MenuItem>
                      <MenuItem value={'S'}>S</MenuItem>
                      <MenuItem value={'L'}>L</MenuItem>
                      <MenuItem value={'Xl'}>Xl</MenuItem>
                      <MenuItem value={'XXl'}>XXl</MenuItem>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-4 mb-3 gap-4">
                

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black" >Product Rating</h3>
                    <Rating
                      value={formField.rating}
                      precision={0.5}
                      onChange={(e, value) =>
                        setfromField(prev => ({ ...prev, rating: value }))
                      }
                    />
                    
                </div>

                             
            </div>

            <div className="col w-full p-5 px-0">
                <h3 className="font-[700] text-[18px] mb-3">Media and Images</h3>
                
                <div className="grid grid-cols-7 gap-4">
                    {
                          preview?.length  !==0 && preview?.map((image,index)=>
                            (
                                <>
                                <div className="uploadBoxWrapper relative"  key={index}>
                                    <span className="absolute -top-[7px] -right-[7px] flex items-center justify-center w-[20px] h-[20px]
                                     rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer "  onClick={()=>removeImage(image,index)}>
                                        <IoMdClose className='text-white text-[10px]' />
                                    </span>
                                    <div className="uploadbox p-0 rounded-md overflow-hidden border border-dashed
                                     border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200
                                     flex items-center justify-center flex-col relative" >
                                        
                                        <LazyLoadImage  src={image} alt='image'  effect='blur'
                                        wrapperProps={{
                                            style:{transitionDelay:'1s'}
                                        }}
                                        className='w-full h-full object-cover'/>
                                    
                                    </div>
                                </div>
                                </>
                            ))
                    }

                    <UploadBox multiple={true}  name="images" url="/api/product/upload-Image" setPreviewFun={setPreviewFun}/>
                </div>
            </div>
            
            </div>
            <br/>
            <hr/>
            <br/>
            <Button type="submit"  className="btn-blue btn-lg  w-full flex gap-2">
               {
                   isLoading === true ?  <CircularProgress color="inherit" /> 
                   :
                   <>
                   <IoMdCloudUpload className='text-[25px] text-white' />Publish and view
                   </>
                    
               }
            </Button>
        </form>
      </section>
      
    </>
  )
}

export default EditProduct

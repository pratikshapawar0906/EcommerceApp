import React from 'react'
import { editData,  deleteData, fetchDataFromApi,} from '../../utils/api';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useState } from 'react';
import UploadBox from '../../Component/UploadBox';
import CircularProgress from '@mui/material/CircularProgress';
import { IoMdCloudUpload } from "react-icons/io";
import Button from '@mui/material/Button';
import { IoMdClose } from 'react-icons/io';
import { useEffect } from 'react';

const EditBanners = () => {

    const Context=useContext(MyContext)
        const[formField,setfromField]=useState({
           images:[],
           bannerTitle:'',
           catId:'',
           subcatId:'',
           thridCatId:'',
           price:'',
           align:''
        })
    
    
        const [productCat,setProductCat]=useState('')
        const [productSubCat,setProductSubCat]=useState('')
        const [productThridSubCat,setProductThridSubCat]=useState('')
        const [align,setAlign]=useState('')
        const [preview,setPreview]=useState([])
        const[isLoading,setIsLoading]=useState(false);
        
        
         
        const id=Context?.isOpenFullScreenPanel?.id;
          
        useEffect(()=>{
          fetchDataFromApi(`/api/banner/${id}`).then((res)=>{
            const banner = res?.data;
            setfromField({
                images: banner.images,
                catId: banner.catId,
                subCatId: banner.subCatId,
                thridCatId:banner.thridCatId,
                price:banner.price,
                bannerTitle:banner.bannerTitle
                
            })
                setPreview(banner.images);
                setProductCat(banner.catId);
                setProductSubCat(banner.subCatId);
                setProductThridSubCat(banner.thridCatId);
                setAlign(banner.align)
                formField.align=banner.align
            })
        },[Context?.isOpenFullScreenPanel])
         const onChangeInput=(e)=>{
           const {name, value}=e.target
            setfromField(prev => ({
              ...prev,
              [name]: value
            }));
          }
    
          const selectedCategory = Context?.catData?.find(
            cat => cat._id === productCat
          );
          
          const selectedSubCategory = selectedCategory?.children?.find(
            sub => sub._id === productSubCat
          );
        
          const setPreviewFun=(previewArr)=>{
            setPreview((prev) => [...prev, ...previewArr]);
        
            setfromField((prev) => ({
              ...prev,
              images: [...prev.images, ...previewArr]
            }));
          }
    
        const handleChangeProductCat = (event) => {
          const selectedId = event.target.value;
          const selectedCat = Context.catData.find(cat => cat._id === selectedId);
        
          setProductCat(selectedId);
          setProductSubCat('');
          setProductThridSubCat('');
          formField.category=event.target.value;
        
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
        
         const handleChangeAlign=(event)=>{
       setAlign(event.target.value)
       formField.align=event.target.value
    }
          const removeImage=(image,index)=>{
            var imageArr=[];
            imageArr=preview;
            deleteData(`/api/banner/deleteImageSlider?img=${image}`).then((res)=>{
                imageArr.splice(index,1);
                setPreview([]);
                setTimeout(()=>{
                  setPreview(imageArr);
                  setfromField(()=>(
                    {
                      ...preview,
                      images:imageArr
                    }
                  ))
                },100)
               
              })
            }
    
        const handleSubmit=(e)=>{
          e.preventDefault();
        
          setIsLoading(true);
              if(formField.bannerTitle === "" ){
                 Context.alertBox("error", "Please enter Banner Title ");
                  return false
              }
               if(formField.price === "" ){
                 Context.alertBox("error", "Please enter Price ");
                  return false
              }
               if(preview?.length=== 0 ){
                 Context.alertBox("error", "Please enter Banner image ");
                  return  false
              }
    
              console.log(formField)
              editData(`/api/banner/updateBanner/${id}`,formField).then((res)=>{
                if(res?.success){
                   Context.alertBox( "success",  res?.message || "Upload Banner successful!" );
                   setTimeout(()=>{
                    setIsLoading(false)
                        Context.setIsOpenFullScreenPanel({
                        open:false,
                    })
                    Context?.getCat();
                   },2500)
                  
                } else {
                   Context.alertBox( "error", res?.message || "Something went wrong!" );
                    setIsLoading(false)
                }
              })
        }
  return (
    <>
      <section className="bg-gray-50 p-5">
        <form action="" className="form p-8 py-3"  onSubmit={handleSubmit}>
             <div className="scroll max-h-[700px] overflow-y-scroll pr-4 pt-4">
              <div className="grid grid-cols-5 mb-3 gap-5">
                <div className="col ">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Banner Title</h3>
                    <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                    onChange={onChangeInput} name="bannerTitle" value={formField.bannerTitle}    disabled={isLoading===true ? true:false}/>
                </div>

                <div className="col ">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Category</h3>
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
                   <h3 className="text-[14px] font-[500] mb-1 text-black "> Sub Category</h3>
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
                   <h3 className="text-[14px] font-[500] mb-1 text-black "> Thrid sub Category</h3>
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
                   <h3 className="text-[14px] font-[500] mb-1 text-black "> Align</h3>
                   <Select
                     labelId="demo-simple-select-label"
                     id="productSubCatDrop"
                     size='small'
                     className='w-full'
                     value={align}
                     label="Category"
                     onChange={handleChangeAlign}
                   >
                   
                     <MenuItem value={'left'}>
                       Left
                     </MenuItem>
                      <MenuItem value={'right'}>
                       Right
                     </MenuItem>
                  
                     
                   </Select>
                </div>

                <div className="col ">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Price</h3>
                    <input type='number' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                    onChange={onChangeInput} name="price" value={formField.price}    disabled={isLoading===true ? true:false}/>
                </div>

            </div>
            <br/>
             <h3 className="text-[18spx] font-[500] mb-0 text-black"> Image</h3>
             <br/>
                  <div className="grid grid-cols-7 gap-4">

                    {
                          preview?.length  !==0 && preview?.map((image,index)=>
                            (
                                
                                 <div className="uploadBoxWrapper relative" key={index}>
                                     <span className="absolute -top-[7px] -right-[7px] flex items-center justify-center w-[20px] h-[20px]
                                      rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer " onClick={()=>removeImage(image,index)}>
                                         <IoMdClose className='text-white text-[10px]' />
                                     </span>
                                     
                                     <div className="uploadbox p-0 rounded-md overflow-hidden border border-dashed
                                      border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200
                                      flex items-center justify-center flex-col relative" >
                                         
                                         <img src={image} 
                                         className='w-full h-full object-cover'/>
                                     
                                     </div>
                                 </div>
                               
                            )
                        )
                    }
                         <UploadBox multiple={true} name="Banner" url="/api/banner/uploadBanner" setPreviewFun={setPreviewFun}/>
                </div>
            </div>

            <div className="w-[250px] mt-2">
                <Button type="submit"  className="btn-blue btn-lg  w-full flex gap-2">
                   {
                       isLoading === true ?  <CircularProgress color="inherit" /> 
                       :
                       <>
                       <IoMdCloudUpload className='text-[25px] text-white' />Publish and view
                       </>
                        
                   }
                </Button>
            </div>
        </form>
    </section> 
    </>
  )
}

export default EditBanners
import React, { useContext, useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "../SideBar/style.css"
import { Collapse } from 'react-collapse'
import { FaAngleDown } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { FaAngleUp } from "react-icons/fa6";
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import Rating from '@mui/material/Rating';
import { MyContext } from '../../App';
import { useLocation } from 'react-router-dom';
import { postData } from '../../utils/api';

const SideBar = (props) => {
  const [isOpencategoryFilter, setIsOpencategoryFilter]=useState(true);

  const [isOpenAvailabilityFilter, setIsOpenAvailabilityFilter]=useState(true);
  const Context=useContext(MyContext)
  const [isOpenSizeFilter, setIsOpenSizeFilter]=useState(true);
  const [filterProduct,setFilterProduct]=useState({
    catId:[],
    subCatId:[],
    thridSubCatId:[],
    minPrice:"",
    maxPrice:'',
    rating:'',
    page:1,
    limit:5
  })

  const[price,setPrice]=useState([0,60000]);

  const location=useLocation();

  const handleCheckboxChange=(field,value)=>{
     const currentValues=filterProduct[field] || [];
     const updatedValues= currentValues?.includes(value) ?
     currentValues.filter((item)=>item !== value) :
     [...currentValues, value];

     setFilterProduct((prev)=>({
      ...prev,
      [field]:updatedValues
     }))


     if(field === 'catId'){
      setFilterProduct((prev)=>({
      ...prev,
      subCatId:[],
      thridSubCatId:[],
     }))
     }
  }

  useEffect(()=>{
    const url = window.location.href;
    const queryParameters=new URLSearchParams(location.search);

    if(url.includes('catId')){
       
      const categoryId= queryParameters.get('catId');
      const catArr=[];
      catArr.push(categoryId)
      filterProduct.catId=catArr;
      filterProduct.subCatId=[];
      filterProduct.thridSubCatId=[];
      filterProduct.rating=[];
    }

    if(url.includes('subCatId')){
       
      const subCategoryId= queryParameters.get('subCatId');
      const  subCatArr=[];
      subCatArr.push( subCategoryId)
      filterProduct.subCatId= subCatArr;
      filterProduct.catId=[];
      filterProduct.subCatId=[];
      filterProduct.rating=[];
    }

    if(url.includes('thridSubCatId')){
       
      const thridCategoryId= queryParameters.get('thridSubCatId');
      const  thridCatArr=[];
      thridCatArr.push( thridCategoryId)
      filterProduct.thridSubCatId= thridCatArr;
      filterProduct.catId=[];
      filterProduct.subCatId=[];
      filterProduct.rating=[];
    }

    filterProduct.page=1
    setTimeout(()=>{
      filtesData();
    })

    },[location])
  
  const filtesData=()=>{
    props.setIsLoading(true)
    postData(`/api/product/Productfilter`,filterProduct).then((res)=>{
      props.setProductData(res);
      props.setIsLoading(false)
      props.setTotalPages(res?.totalPages)
      window.scrollTo(0,0)
    })
  }

  useEffect(()=>{
    filterProduct.page=props.page
    filtesData()
  },[filterProduct,props.page])

  useEffect(()=>{
    setFilterProduct((prev)=>({
      ...prev,
      minPrice:price[0],
      maxPrice:price[1],
      page: 1
    }))
  },[price])

  return (
    <>
      
      <aside className='sidebar py-5 sticky top-[130px] z-[50]'>
        <div className="box">
            <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-5'> Shop By category
              <Button className=" !w-[30px] !h-[30px]!min-w-[30px]!rounded-full  !ml-auto 
              !text-[#000] "onClick={()=>setIsOpencategoryFilter(!isOpencategoryFilter)}>
              {
                 isOpencategoryFilter ===true  ? <FaAngleUp/> :<FaAngleDown/>
              }
               
                </Button>
            </h3>

            <Collapse isOpened={isOpencategoryFilter}>
              <div className="scroll px-4 relative -left-[13px]">
              {
                Context?.catData?.length !==0  &&  Context?.catData?.map((item,index)=>{
                  return(
                       <FormControlLabel control={<Checkbox />} key={index} value={item?._id} checked={filterProduct?.catId?.includes(item?._id)} label={item?.name} 
                       onChange={()=>handleCheckboxChange('catId',item?._id)} className='w-full' />
                  )
                })
              }
               
              </div>
            </Collapse>
        </div>

        {/* <div className="box">
            <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-5'>  Availability
              <Button className=" !w-[30px] !h-[30px]!min-w-[30px]!rounded-full  !ml-auto 
              !text-[#000] "onClick={()=>setIsOpenAvailabilityFilter(!isOpenAvailabilityFilter)}>
              {
                 isOpencategoryFilter ===true  ? <FaAngleUp/> :<FaAngleDown/>
              }
               
                </Button>
            </h3>

            <Collapse isOpened={isOpenAvailabilityFilter}>
              <div className="scroll px-4 relative -left-[13px]">
               <FormControlLabel control={<Checkbox size="small"/>} label="Available (17)"  className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label="In Stock  (17)" className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label="Not Available (1)" className='w-full' />
                        
  
              </div>
            </Collapse>
        </div>

        <div className="box mt-3">
            <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-5'> Size
              <Button className=" !w-[30px] !h-[30px]!min-w-[30px]!rounded-full  !ml-auto 
              !text-[#000] "onClick={()=>setIsOpenSizeFilter(!isOpenSizeFilter)}>
              {
                 isOpencategoryFilter ===true  ? <FaAngleUp/> :<FaAngleDown/>
              }
               
                </Button>
            </h3>

            <Collapse isOpened={isOpenSizeFilter}>
              <div className="scroll px-4 relative -left-[13px]">
               <FormControlLabel control={<Checkbox size="small"/>} label="small"  className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label="Mediam" className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label=" Large" className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label=" xl" className='w-full' />
               <FormControlLabel  control={<Checkbox size="small"/>} label=" xxl" className='w-full' />
                        
  
              </div>
            </Collapse>
        </div> */}

        <div className="box mt-4 ">
            <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-5'>
              Filter By Price
             
            </h3>
            <RangeSlider  value={price} onInput={setPrice} min={100} max={60000} step={5} />
            <div className="flex pt-4 pb-2 priceRange">
              <span className='text-[13px]'>
                From: <strong className="text-dark">Rs:{price[0]}</strong>
              </span>
               <span className='ml-auto text-[13px]'>
                From: <strong className="text-dark">Rs:{price[1]}</strong>
              </span>
            </div>
        </div>

         <div className="box mt-4 ">
            <h3 className='mb-3 text-[16px] font-[600] flex items-center pr-5'>
              Filter By Rating
             
            </h3>

            <div className=" flex items-center">
             <FormControlLabel control={<Checkbox />}  value={5} checked={filterProduct?.rating?.includes(5)}  
                onChange={()=>handleCheckboxChange('rating',5)}  />

                <Rating name="rating" value={5} size="small" readOnly  />
            </div>  

            <div className=" flex items-center">
             <FormControlLabel control={<Checkbox />}  value={4} checked={filterProduct?.rating?.includes(4)}  
                onChange={()=>handleCheckboxChange('rating',4)}  />

                <Rating name="rating" value={4} size="small" readOnly  />
            </div>
              
              <div className=" flex items-center">
             <FormControlLabel control={<Checkbox />}  value={3} checked={filterProduct?.rating?.includes(3)}  
                onChange={()=>handleCheckboxChange('rating',3)}  />

                <Rating name="rating" value={3} size="small" readOnly  />
            </div>

            <div className=" flex items-center">
             <FormControlLabel control={<Checkbox />}  value={2} checked={filterProduct?.rating?.includes(2)}  
                onChange={()=>handleCheckboxChange('rating',2)}  />

                <Rating name="rating" value={2} size="small" readOnly  />
            </div>
            <div className=" flex items-center">
             <FormControlLabel control={<Checkbox />}  value={1} checked={filterProduct?.rating?.includes(1)}  
                onChange={()=>handleCheckboxChange('rating',1)}  />

                <Rating name="rating" value={1} size="small" readOnly  />
            </div>
            
             
        </div>
      </aside>
    </>
  )
}

export default SideBar

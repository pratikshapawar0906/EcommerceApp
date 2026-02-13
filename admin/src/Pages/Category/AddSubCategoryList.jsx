import React, { useState } from 'react'
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useContext } from 'react'
import { MyContext } from '../../App'
import CircularProgress from '@mui/material/CircularProgress'
import { postData } from '../../utils/api'

const AddSubCategoryList = () => {
  const [productCat, setProductCat] = useState('');
  const [productCat2, setProductCat2] = useState('');
  const[isLoading,setIsLoading]=useState(false);
  const[isLoading2,setIsLoading2]=useState(false);
  const Context=useContext(MyContext)

  const[formField,setfromField]=useState({
        name:"", 
        parentCatName:null,  
        parentId:null
  })

  const[formField2,setfromField2]=useState({
        name:"", 
        parentCatName:null,  
        parentId:null
  })

  const handleChangeProductCat = (event) => {
    const selectedId = event.target.value;
    const selectedCat = Context.catData.find(cat => cat._id === selectedId);
  
    setProductCat(selectedId);
  
    setfromField(prev => ({
      ...prev,
      parentId: selectedId,
      parentCatName: selectedCat?.name || null
    }));
  };


  const handleChangeProductCat2 = (event) => {
    const selectedId = event.target.value;
    let selectedSubCat = null;

    Context.catData.forEach(parent => {
      const found = parent.children?.find(child => child._id === selectedId);
      if (found) selectedSubCat = found;
    });
  
    setProductCat2(selectedId);
  
    setfromField2(prev => ({
      ...prev,
      parentId: selectedId,
      parentCatName: selectedSubCat?.name || null
    }));
  };


  const onChangeInput=(e)=>{
   const {name, value}=e.target
    setfromField(()=>{
      return{
       ...formField,
       [name]: value
      }
    })
  }

  const onChangeInput2=(e)=>{
   const {name, value}=e.target
    setfromField2(()=>{
      return{
       ...formField2,
       [name]: value
      }
    })
  }


  const handleSubmit=(e)=>{
        e.preventDefault();
        
      
        setIsLoading(true);
            if(formField.name === ""  ){
               Context.alertBox("error", "Please enter Category  name ");
                return false
            }
             if(productCat=== "" ){
               Context.alertBox("error", "Please Select Parent  Category  image ");
                return  false
            }
            console.log(formField)
  
            postData('/api/category/createCat',formField).then((res)=>{
              if(res?.success){
                 Context.alertBox( "success",  res?.message || "Created category  successful!" );
                 setTimeout(()=>{
                  setIsLoading(false)
                      Context.setIsOpenFullScreenPanel({
                      open:false,
                  })
                  Context?.getCat();
                 },1500)
                
              } else {
                 Context.alertBox( "error", res?.message || "Something went wrong!" );
                  setIsLoading(false)
              }
            })
    }

    const handleSubmitThridLevel=(e)=>{
        e.preventDefault();
        
      
        setIsLoading2(true);
            if(formField2.name === ""  ){
               Context.alertBox("error", "Please enter Category  name ");
                return false
            }
             if(productCat2=== "" ){
               Context.alertBox("error", "Please Select Parent  Category  image ");
                return  false
            }
            console.log(formField2)
  
            postData('/api/category/createCat',formField2).then((res)=>{
              if(res?.success){
                 Context.alertBox( "success",  res?.message || "Created category  successful!" );
                 setTimeout(()=>{
                  setIsLoading2(false)
                      Context.setIsOpenFullScreenPanel({
                      open:false,
                  })
                  Context?.getCat();
                 },1500)
                
              } else {
                 Context.alertBox( "error", res?.message || "Something went wrong!" );
                  setIsLoading2(false)
              }
            })
    }

    
  return (
    <>
      <section className="bg-gray-50 p-5 grid grid-cols-2 gap-10 ">
        <form action="" className="form p-8 py-3" onSubmit={handleSubmit}>
          <h1 className=" font-[600">Add Sub Category </h1>
            <div className="scroll max-h-[700px] overflow-y-scroll pr-4 pt-4">
              <div className="grid grid-cols-2 mb-3 gap-5">
                 <div className="col ">
                    <h3 className="text-[14px] font-[500] mb-1 text-black"  >Product Category</h3>
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
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Sub Category Name</h3>
                    <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                    onChange={onChangeInput} name="name" value={formField.name}    disabled={isLoading===true ? true:false}/>
                </div>
            </div>
            <br/>
             
            </div>
          
            <div className="w-[250px]">
                <Button type="submit" className="btn-blue btn-lg  w-full flex gap-2">
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

        <form action="" className="form p-8 py-3" onSubmit={handleSubmitThridLevel}>
           <h1 className=" font-[600">Add Thrid Lavel Category </h1>
            <div className="scroll max-h-[700px] overflow-y-scroll pr-4 pt-4">
              <div className="grid grid-cols-2 mb-3 gap-5">
                 <div className="col ">
                    <h3 className="text-[14px] font-[500] mb-1 text-black"  >Product Sub Category</h3>
                    <Select
                      labelId="demo-simple-select-label"
                      id="productCatDrop"
                      size='small'
                      className='w-full'
                      value={productCat2}
                      label="Category"
                      onChange={handleChangeProductCat2}
                    >
                     { Context?.catData?.length !==0 && Context?.catData?.map((item)=>
                       item?.children?.map(child => (
                         <MenuItem key={child._id} value={child._id}>
                           {child.name}
                         </MenuItem>
                       ))
                     )}
                     
                    </Select>
                </div>

                <div className="col">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Thrid Level Category Name</h3>
                    <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                    onChange={onChangeInput2} name="name" value={formField2.name}    disabled={isLoading===true ? true:false}/>
                </div>
            </div>
            <br/>
             
            </div>
          
            <div className="w-[250px]">
                <Button type="submit" className="btn-blue btn-lg  w-full flex gap-2">
                  {
                      isLoading2 === true ?  <CircularProgress color="inherit" /> 
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

export default AddSubCategoryList

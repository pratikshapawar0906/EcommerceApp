import React, { useContext, useEffect } from 'react'
import { editData, fetchDataFromApi } from '../../utils/api';
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io'
import UploadBox from '../../Component/UploadBox'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { deleteData, postData } from '../../utils/api'
import { MyContext } from '../../App'
import CircularProgress from '@mui/material/CircularProgress'

const EditCategory = () => {
    const [preview,setPreview]=useState([])
   const[isLoading,setIsLoading]=useState(false);
   const Context=useContext(MyContext)

  const[formField,setfromField]=useState({
     name:"", images:[],  
    //  parentCatName:"",  
    //  parentId: ""
  })
  const id=Context?.isOpenFullScreenPanel?.id;

  useEffect(()=>{
    fetchDataFromApi(`/api/category/${id}`).then((res)=>{
        console.log(res?.category)
           formField.name=res?.category?.name
           setPreview(res?.category?.images)
      })
  },[Context?.isOpenFullScreenPanel])

  const onChangeInput=(e)=>{
   const {name, value}=e.target
    setfromField(()=>{
      return{
       ...formField,
       [name]: value
      }
    })
  }

  const setPreviewFun=(previewArr)=>{
    setPreview((prev) => [...prev, ...previewArr]);

    setfromField((prev) => ({
      ...prev,
      images: [...prev.images, ...previewArr]
    }));
  }

  const removeImage=(image,index)=>{
    var imageArr=[];
    imageArr=preview;
    deleteData(`/api/category/deleteImage?img=${image}`).then((res)=>{
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
          if(formField.name === "" ){
             Context.alertBox("error", "Please enter Category  name ");
              return false
          }
           if(preview?.length=== 0 ){
             Context.alertBox("error", "Please enter Category  image ");
              return  false
          }

          editData(`/api/category/updatecategory/${id}`,formField).then((res)=>{
            if(res?.success){
               Context.alertBox("success",  res?.message || "Created category  successful!" );
               setTimeout(()=>{
                setIsLoading(false)
                    Context.setIsOpenFullScreenPanel({
                    open:false,
                })
               },1500)
              
            } else {
               Context.alertBox("error", res?.message || "Something went wrong!" );
                setIsLoading(false)
            }
          })
    }
  return (
    <>
       <section className="bg-gray-50 p-5">
        <form action="" className="form p-8 py-3"  onSubmit={handleSubmit}>
          
            <div className="scroll max-h-[700px] overflow-y-scroll pr-4 pt-4">
              <div className="grid grid-cols-1 mb-3">
                <div className="col w-[25%]">
                    <h3 className="text-[14px] font-[500] mb-1 text-black">Category Name</h3>
                    <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                    onChange={onChangeInput} name="name" value={formField.name}    disabled={isLoading===true ? true:false}/>
                </div>
            </div>
            <br/>
             <h3 className="text-[18spx] font-[500] mb-1 text-black">Category Image</h3>
             <br/>
                  <div className="grid grid-cols-7 gap-4">

                    {
                          preview?.length  !==0 && preview?.map((image,index)=>
                            (
                                
                                 <div className="uploadBoxWrapper relative" key={image}>
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
                         <UploadBox multiple={true} name="images" url="/api/category/upload-Image" setPreviewFun={setPreviewFun}/>
                </div>
            </div>
            <br/>
            
            <br/>
            <br/>
            <div className="w-[250px]">
                <Button type="submit" className="btn-blue btn-lg  w-full flex gap-2">
                  {
                        isLoading === true ?  <CircularProgress color="inherit" /> 
                        :
                         'Publish and view'
                    }
                    <IoMdCloudUpload className='text-[25px] text-white' />
                    
                  </Button>
            </div>
        </form>
      </section>
    </>
  )
}

export default EditCategory

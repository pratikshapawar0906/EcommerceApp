import React, { useContext, useState } from 'react'
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import UploadBox from '../../Component/UploadBox'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { MyContext } from '../../App'
import { deleteData, postData } from '../../utils/api'
// import useNavigate from 'react-router-dom'

const AddHomeSlider = () => {
  const [preview,setPreview]=useState([])
   const[isLoading,setIsLoading]=useState(false);
   const Context=useContext(MyContext)

  const[formField,setfromField]=useState({ 
    images:[],  
  })


  // const history=useNavigate()
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
    deleteData(`/api/homeSlider/deleteImageSlider?img=${image}`).then((res)=>{
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
           if(preview?.length=== 0 ){
             Context.alertBox("error", "Please enter Category  image ");
              return  false
          }

          postData('/api/homeSlider/createHomeSlider',formField).then((res)=>{
            if(res?.success){
               Context.alertBox( "success",  res?.message || "Upload Home Slider successful!" );
               setTimeout(()=>{
                setIsLoading(false)
                    Context.setIsOpenFullScreenPanel({
                    open:false,
                })
                Context?.getCat();
                // history("/homeSlider/list")
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
        <form action="" className="form p-8 py-3"  onSubmit={handleSubmit}>
            <div className="scroll max-h-[700px] overflow-y-scroll pr-4">
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
                                            
                                            <LazyLoadImage  src={image}  alt='image'  effect='blur'
                                            wrapperProps={{
                                                style:{transitionDelay:'1s'}
                                            }}
                                            className='w-full h-full object-cover'/>
                                        
                                        </div>
                                    </div>
                            ))
                    }
                    

                   
                    <UploadBox  multiple={true} name="HomeSlider" url="/api/homeSlider/uploadHomeSlider" setPreviewFun={setPreviewFun}/>
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

export default AddHomeSlider

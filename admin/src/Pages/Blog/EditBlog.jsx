import React from 'react'
import { editData,  deleteData, fetchDataFromApi,} from '../../utils/api';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useState } from 'react';
import UploadBox from '../../Component/UploadBox';
import CircularProgress from '@mui/material/CircularProgress';
import { IoMdCloudUpload } from "react-icons/io";
import Button from '@mui/material/Button';
import { IoMdClose } from 'react-icons/io';
import { useEffect } from 'react';
import Editor from'react-simple-wysiwyG'

const EditBlog = () => {
    const Context=useContext(MyContext)
    const[formField,setfromField]=useState({
       images:[],
       blogTitle:'',
       descripation:''
    })

    const[html,setHtml]=useState('')
    const [preview,setPreview]=useState([])
    const[isLoading,setIsLoading]=useState(false);
    
    
    
     
    const id=Context?.isOpenFullScreenPanel?.id;
      
    useEffect(()=>{
      fetchDataFromApi(`/api/blog/${id}`).then((res)=>{
        const Blog = res?.data;
        setfromField({
            images: Blog.images,
            blogTitle:Blog.blogTitle,
            descripation:Blog.descripation
            
        })
            setPreview(Blog.images);
            formField.descripation=Blog.descripation
            formField.blogTitle=Blog.blogTitle
            setHtml(Blog.descripation)
        })
    },[Context?.isOpenFullScreenPanel])

    const onChangeInput=(e)=>{
     const {name, value}=e.target
      setfromField(prev => ({
        ...prev,
        [name]: value
      }));
    }
    const onChangeDescripation=(event)=>{
        setHtml(event.target.value);
        formField.descripation=event.target.value
        
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
        deleteData(`/api/blog/deleteImageSlider?img=${image}`).then((res)=>{
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
          if(formField.blogTitle === "" ){
             Context.alertBox("error", "Please enter Blog Title ");
              return false
          }
           if(formField.descripation === "" ){
             Context.alertBox("error", "Please enter Descripation ");
              return false
          }
           if(preview?.length=== 0 ){
             Context.alertBox("error", "Please enter Blog image ");
              return  false
          }

          console.log(formField)
          editData(`/api/blog/updateBlog/${id}`,formField).then((res)=>{
            if(res?.success){
               Context.alertBox( "success",  res?.message || "Upload Blog successful!" );
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
                   <div className="grid grid-cols-1 mb-3 gap-5">
                     <div className="col w-[100%]">
                         <h3 className="text-[14px] font-[500] mb-1 text-black">Blog Title</h3>
                         <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                         focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                         onChange={onChangeInput} name="blogTitle" value={formField.blogTitle}    disabled={isLoading===true ? true:false}/>
                     </div>
     
                    
                    <div className="grid grid-cols-1 mb-3 gap-5">
                     <div className="col w-[100%]">
                           <h3 className="text-[14px] font-[500] mb-1 text-black">Descripation</h3>
                            <Editor value={html} onChange={onChangeDescripation}
                            containerProps={{style:{resize:'vertical'}}}/>
                       </div>
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
                              <UploadBox multiple={true} name="Blog" url="/api/blog/uploadBlog" setPreviewFun={setPreviewFun}/>
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

export default EditBlog
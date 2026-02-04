import React from 'react'
import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import { useContext } from 'react';
import { useEffect } from 'react';
import { editData, fetchDataFromApi, postData, uploadImage } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css'
import TextField from '@mui/material/TextField';
import { Collapse } from 'react-collapse';
import Radio from '@mui/material/Radio';


const Profile = () => {
   const[uploading,setuploading]=useState(false);
   const [preview,setPreview]=useState([])
   const [phone,setPhone]=useState('')
  const[isLoading,setIsLoading]=useState(false);
  const[isLoading2,setIsLoading2]=useState(false);
  const Context=useContext(MyContext);
  const history = useNavigate();
   const[address ,setAddress]=useState([])
  const[userId,setUserId]=useState("")
  const[formFields, setFormFields]=useState({name:'',  mobile:'',email:''})
  const[changePassword, setChangePassword]=useState({email:'',oldPassword:'',  newPassword:'',confirmPassword:''})
  const[isChangePasswordFormShow, setIsChangePasswordFormShow]=useState(false)
  const[selectedValue,setSelectedValue]=useState(null)
  

  useEffect(()=>{ 
     const token=localStorage.getItem("accesstoken");
     if(token===null){
       history('/login')
     }

  },[Context?.isLogin])

  const handleChange=(event)=>{
    setSelectedValue(event.target.value)
  }

  useEffect(()=>{
     if(Context?.userData?._id !==undefined && Context?.userData?._id !==""){
           fetchDataFromApi(`/api/address/get?userId=${Context?.userData?._id}`).then((res)=>{
              setAddress(res.address);
             Context?.setAddress(res.address)

              const defaultAddress = res.address.find(addr => addr.selected === true);
              if (defaultAddress) {
                setSelectedValue(defaultAddress);
              }
         })
         setUserId(Context?.userData?._id);
         setFormFields({
          name:Context?.userData?.name,
          email:Context?.userData?.email,
          mobile:Context?.userData?.mobile
         })

         const ph=`"${Context?.userData?.mobile}"`
         setPhone(ph);
          setChangePassword(prev => ({
            ...prev,
            email: Context?.userData?.email || '',
          }));
      }
  },[Context?.userData])

  


  const onChangeInput=(e)=>{
      const {name, value}= e.target;
      setFormFields(()=>{
          return{
              ...formFields,
              [name]:value
          }
      })

      setChangePassword(prev => ({
         ...prev,
         [name]: value
      }))
  }



  useEffect(()=>{
    fetchDataFromApi(`/api/address/get?.${formFields.userId}`).then((res)=>{
     })
  },[])
  

  const valideValue=Object.values(formFields).every(el=>el);
  const valideValue2=Object.values(changePassword).every(el=>el);
    
  const handleSubmit=(e)=>{
       e.preventDefault();
       setIsLoading(true);
       if(formFields.email === "" ){
          Context.alertBox("error", "Please add Email ");
           return false
       }
       if(formFields.name === ""){
       Context.alertBox("error", "Please add Full Name")
       return false
       }
      if(formFields.mobile === ""){
       Context.alertBox("error", "Please add mobile Number")
       return false
   }
   editData(`/api/user/${userId}`, formFields,{ withCredentials :true}).then((res)=>{
       if(res?.success){
          Context.alertBox( "success",  res?.data?.message || "Profile updated successfully" );
          setIsLoading(false)

          localStorage.setItem("accesstoken",res?.data?.accesstoken);
          localStorage.setItem("refreshtoken",res?.data?.refreshtoken);
          
          Context.setIsLogin(true)
       } else {
          Context.alertBox( "error", res?.data?.message || "error updating Profile" );
           setIsLoading(false)
       }
       
   })
   .catch((err) => {
     Context.alertBox( "error",  "Server error!" );
     console.error(err);
   });
  }

  const handleSubmitChangePassword=(e)=>{
       e.preventDefault();
       setIsLoading2(true);
       if(changePassword.email === "" ){
          Context.alertBox("error", "Please add Email ");
           return 
       }
       if(changePassword.oldPassword === "" ){
          Context.alertBox("error", "Please add Old Password");
           return 
       }
       if(changePassword.newPassword === ""){
       Context.alertBox("error", "Please add New Password")
       return
       }
      if(changePassword.confirmPassword !== changePassword.newPassword ){
       Context.alertBox("error", "New Password and Comfirm Password does not match")
       return 
   }
   postData(`/api/user/reset-password`, changePassword,{ withCredentials :true}).then((res)=>{
       if(res?.success){
          Context.alertBox( "success",  res?.data?.message  );
          setIsLoading2(false)

          localStorage.setItem("accesstoken",res?.data?.accesstoken);
          localStorage.setItem("refreshtoken",res?.data?.refreshtoken);
          
          Context.setIsLogin(true)
       } else {
          Context.alertBox( "error", res?.data?.message  );
           setIsLoading2(false)
       }
       
   })
   .catch((err) => {
     Context.alertBox( "error",  "Server error!" );
     console.error(err);
   });
  }

    useEffect(()=>{
        const userAvatar=[];
        if(Context?.userData?.avatar !==undefined && Context?.userData?.avatar !==""){
            userAvatar.push(Context?.userData?.avatar);
           setPreview(userAvatar);
        }
    },[Context?.userData])
       
  let selectedImages=[];
   
  const onChangeFile=async(e)=>{
   try {
      const formdata=new FormData();
      setPreview([]);
      const files = e.target.files;
      setuploading(true);
      for(var i=0;i<files.length;i++){
          if(
              files[i] &&
              (files[i].type ==='image/jpeg'||
               files[i].type ==='image/jpg'||
               files[i].type ==='image/png'||
               files[i].type ==='image/webp')
          ){
              const file=files[i];
              selectedImages.push(file);
              formdata.append(`avatar`,file);
              
          }else{
              setuploading(false);
              Context.alertBox("error","Please Select a valid PNG,JPEG,WEBP or JPG image file")
              return false
          }
      }
      uploadImage("/api/user/user-avatar",formdata).then((res)=>{
      setuploading(false)
      setPreview([res.data.avatar]);
      })
      
   } catch (error) {
      console.log(error)
   }
  }
  return (
    <>

    <div className="card my-4 pt-5  w-[65%] shadow-md sm:rounded-lg bg-white px-5 pb-5 ">
      <div className="flex items-center justify-between">
         <h2 className="text-[18px] font-[600]">
        User Profile
      </h2>

      <Button className='!ml-auto' onClick={()=>setIsChangePasswordFormShow(!isChangePasswordFormShow)}>Change Password</Button>
      </div>
 

      <br/>
      <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group
        flex items-center justify-center bg-gray-200">
             {
                uploading === true ? <CircularProgress color="inherit" /> 
                :
                <>
                {
                    preview?.length !==0 ? preview?.map((img,index)=>{
                         return (
                            <img src={img}  key={index} className='w-full h-full object-cover'/>
                         )
                    })
                    :
                    <img src="./userImage.jpeg" className='w-full h-full object-cover'/>
                }
               </>
             }
        

             <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)]
             flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
                <FaCloudUploadAlt className='text-[#fff] text-[25px]'/>
                <input type="file"  accept='image/*' className=' absolute top-0 left-0 w-full h-full opacity-0'
                onChange={(e)=>onChangeFile(e,`/api/user/user-avatar`)} name='avatar'/>
             </div>
        </div>

      <form className='form mt-8' onSubmit={handleSubmit}>
          <div className="flex items-center gap-5  ">
            <div className="w-[50%]">
                  <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' value={formFields.name}
                     name='name' onChange={onChangeInput} disabled={isLoading===true ? true:false} />
            </div>
            <div className="w-[50%]">
                  <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' value={formFields.email}
                     name='email' onChange={onChangeInput} disabled={true } />
            </div>     
          </div>
          <div className="flex items-center mt-4 gap-5">
             <div className="w-[50%]">
              <PhoneInput defaultCountry="in" value={phone} disabled={isLoading===true ? true:false}  onChange={((phone)=>{
                setPhone(phone);
                setFormFields((prev) => ({
                  ...prev,
                  mobile: phone,
                }))
              })}/>
              
            </div>
          </div>
          <br/>
          <div className="flex items-center justify-center p-5 border border-dashed 
             border-[rgba(0,0,0,0.2) bg-[#f1faff] hover:bg-[#f1faff] cursor-pointer"
             onClick={()=>Context.setIsOpenFullScreenPanel({
                   open:true,
                   model:'Add New Address'
                 })}>
              <span className="text-[16px] font-[500]"> Add Address</span>
          </div>
          <br/>

          <div className="flex gap-2 flex-col mt-4 ">
          {address?.length > 0 &&
            address.map((item, index) => {
          
              const addressValue = `${item.addressLine1}, ${item.city}, ${item.state}, ${item.country} - ${item.pincode}`;
          
              return (
                <div
                  key={index}
                  
                  className={`addressbox bg-[#f1f1f1] rounded-md p-3 cursor-pointer w-full flex items-center
                  border border-dashed border-[rgba(0,0,0,0.2)]`}
                >
                  <Radio
                    name="address"
                    value={item?._id}
                    checked={selectedValue?._id === item?._id}
                    onChange={handleChange}
                    onClick={()=>setSelectedValue(item)}
                  />
          
                  <span className="text-[12px] ml-2">{addressValue}</span>
                </div>
              );
            })}

          </div>
          
         
          <br/>
                    
          <div className="flex items-center gap-4">
            <Button className='btn-blue btn-lg w-full' disabled={!valideValue}  type='submit'>
              {
                isLoading ===true ? <CircularProgress color='inherit'/>
                :
                'Update Profile'
              }
            </Button>
           
          </div>
      </form>

       <Collapse isOpened={isChangePasswordFormShow}>
          <div className="card  w-[65%]bg-white p-5 shadow-md  rounded-md">
            <div className="flex items-center pb-3">
              <h2 className="pb-3  text-[18px] font-[600]">Change Password</h2>
            </div>
            <hr/>
             <form className='mt-8' onSubmit={handleSubmitChangePassword}>
              <div className="flex items-center gap-5  ">
                <div className="w-[50%]">
                      <TextField id="outlined-basic" label="Old Password" value={changePassword.oldPassword} variant="outlined"  type='password'
                      className='w-full'  name='oldPassword' onChange={onChangeInput} disabled={isLoading2===true ? true:false} />
                </div>
                <div className="w-[50%]">
                      <TextField id="outlined-basic" label="New Password" value={changePassword.newPassword} variant="outlined"  type='password'
                      className='w-full'  name='newPassword' onChange={onChangeInput} disabled={isLoading2===true ? true:false}/>
                </div>           
              </div>
              <div className="flex items-center mt-4 gap-5">
                 <div className="w-[50%]">
                      <TextField id="outlined-basic" label="confirm Password" value={changePassword.confirmPassword} variant="outlined"  type='password'
                      className='w-full'  name='confirmPassword' onChange={onChangeInput} disabled={isLoading2===true ? true:false} />
                </div>
              </div>

              <br/>

              


              <br/>
              <div className="flex items-center gap-4">
                <Button className='btn-blue btn-lg w-[100%]' type="submit"  disabled={!valideValue2}>
                  {
                      isLoading2 === true ?  <CircularProgress color="inherit" /> 
                      :
                       'Change Password'
                  }
                </Button>
                
              </div>
           </form>
          </div>
        </Collapse>
    </div>
    </>
  )
}

export default Profile
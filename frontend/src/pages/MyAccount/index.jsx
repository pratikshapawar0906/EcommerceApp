import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../Component/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { editData, postData } from '../../utils/api';
import { Collapse } from 'react-collapse';

const MyAccount = () => {

  const[isLoading,setIsLoading]=useState(false);
  const[isLoading2,setIsLoading2]=useState(false);
  const Context=useContext(MyContext);
  const history = useNavigate();
  const[userId,setUserId]=useState("")
  const[formFields, setFormFields]=useState({name:'',  mobile:'',email:''})
  const[changePassword, setChangePassword]=useState({email:'',oldPassword:'',  newPassword:'',confirmPassword:''})
  const[isChangePasswordFormShow, setIsChangePasswordFormShow]=useState(false)

  useEffect(()=>{ 
     const token=localStorage.getItem("accesstoken");
     if(token===null){
       history('/')
     }
  },[history])

  useEffect(()=>{
      if(Context?.userData?._id !==undefined && Context?.userData?._id !==""){
         setUserId(Context?.userData?._id);
         setFormFields({
          name:Context?.userData?.name,
          email:Context?.userData?.email,
          mobile:Context?.userData?.mobile
         })

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

  

  const valideValue=Object.values(formFields).every(el=>el);
  const valideValue2=Object.values(changePassword).every(el=>el);
    
  const handleSubmit=(e)=>{
       e.preventDefault();
       setIsLoading(true);
       if(formFields.email === "" ){
          Context.alertBox("error", "Please add Email ");
           return 
       }
       if(formFields.name === ""){
       Context.alertBox("error", "Please add Full Name")
       return
       }
      if(formFields.mobile === ""){
       Context.alertBox("error", "Please add mobile Number")
       return 
   }
   editData(`/api/user/${userId}`, formFields,{ withCredentials :true}).then((res)=>{
       if(res?.success){
          Context.alertBox( "success",  res?.data?.message  );
          setIsLoading(false)

          localStorage.setItem("accesstoken",res?.data?.accesstoken);
          localStorage.setItem("refreshToken",res?.data?.refreshToken);
          
          Context.setIsLogin(true)
       } else {
          Context.alertBox( "error", res?.data?.message  );
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
          localStorage.setItem("refreshToken",res?.data?.refreshToken);
          
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
  return (
    <>
      <section className="py-10 w-full">
        <div className="container  flex  gap-5">
            <div className="col1 w-[20%]">
              <AccountSidebar/>
            </div>

            <div className="col2 w-[50%]">
                <div className="card bg-white p-5 shadow-md  rounded-md mb-5">
                    <div className="flex items-center pb-3">
                      <h2 className="pb-3">My Profile</h2>
                      <Button className='!ml-auto' onClick={()=>setIsChangePasswordFormShow(!isChangePasswordFormShow)}>Change Password</Button>
                    </div>

                    <hr/>

                   <form className='mt-8' onSubmit={handleSubmit}>
                      <div className="flex items-center gap-5  ">
                        <div className="w-[50%]">
                              <TextField id="outlined-basic" label="Full name" value={formFields.name} variant="outlined" type='text'
                              className='w-full'  name='name' onChange={onChangeInput} disabled={isLoading===true ? true:false} />
                        </div>

                        <div className="w-[50%]">
                              <TextField id="outlined-basic" label="email" value={formFields.email} variant="outlined" type='email'
                              className='w-full'  name='email' onChange={onChangeInput} disabled={true}/>
                        </div>           
                      </div>

                      <div className="flex items-center mt-4 gap-5">
                         <div className="w-[100%]">
                              <TextField id="outlined-basic" label="Phone number" value={formFields.mobile} variant="outlined" type='number'
                              className='w-full'  name='mobile' onChange={onChangeInput} disabled={isLoading===true ? true:false} />
                        </div>
                      </div>

                      <br/>
                      <div className="flex items-center gap-4">
                        <Button className='btn-org btn-lg w-[100px]' type="submit"  disabled={!valideValue}>
                          {
                              isLoading === true ?  <CircularProgress color="inherit" /> 
                              :
                               'Save'
                          }
                        </Button>
                       
                      </div>
                   </form>
                </div>
               
                  <Collapse isOpened={isChangePasswordFormShow}>
                  <div className="card bg-white p-5 shadow-md  rounded-md">
                    <div className="flex items-center pb-3">
                      <h2 className="pb-3">Change Password</h2>
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
                         <div className="w-[100%]">
                              <TextField id="outlined-basic" label="confirm Password" value={changePassword.confirmPassword} variant="outlined"  type='password'
                              className='w-full'  name='confirmPassword' onChange={onChangeInput} disabled={isLoading2===true ? true:false} />
                        </div>
                      </div>

                      <br/>
                      <div className="flex items-center gap-4">
                        <Button className='btn-org btn-lg w-[200px]' type="submit"  disabled={!valideValue2}>
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
        </div>
      </section>
    </>
  )
}

export default MyAccount

import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import { CgLogIn } from "react-icons/cg";
import { FaRegEye, FaRegUser } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useContext } from 'react';
import { MyContext } from '../../App';
import {  useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';


const ChangePassword = () => {

  const[formFields, setFormFields]=useState({email:localStorage.getItem("userEmail"), newPassword:'', confirmPassword:''})
      const Context=useContext(MyContext)
      const[isLoading,setIsLoading]=useState(false);
  
      const history=useNavigate()
  
       const [isPasswordShow1, setIsPasswordShow1]=useState(false);
       const [isPasswordShow2, setIsPasswordShow2]=useState(false);
       const onChangeInput=(e)=>{
          const {name, value}= e.target;
          setFormFields(()=>{
              return{
                  ...formFields,
                  [name]:value
              }
          })
      }
  
      const valideValue=Object.values(formFields).every(el=>el);
      
          const handleSubmit=(e)=>{
                  e.preventDefault();
                  setIsLoading(true);
                  if(formFields.newPassword === ""){
                  Context.alertBox("error", "Please add New Password")
                  return 
                  }
  
                  if(formFields.confirmPassword === ""){
                  Context.alertBox("error", "Please add confirm Password")
                  return 
                  }
  
                  if(formFields.confirmPassword !== formFields.newPassword ){
                  Context.alertBox("error", "newPassword and confirm Password are not  match")
                  return 
                  }
              
              postData("/api/user/reset-password", formFields,{ withCredentials :true}).then((res)=>{
                  if(res?.success){
                     localStorage.removeItem("userEmail")
                     localStorage.removeItem("actionType")
                     localStorage.removeItem("refreshToken")
                     Context.alertBox( "success",  res?.message || "Password Comfirm successful!" );
                     setIsLoading(false)
                     setFormFields({
                          newPassword:'', confirmPassword:''
                     })
                     setIsLoading(true);
                     history('/login')
                  } else {
                     Context.alertBox( "error", res?.message || "Something went wrong!" );
                      setIsLoading(false)
                  }
                  
              })
              .catch((err) => {
                Context.alertBox( "error",  "Server error!" );
                console.error(err);
              });
             }
  
       
    


  return (
    <>
      <section className=" bg-white w-full ">
          <header className=' w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50'>
            <Link to=''><img src='./logo.a795e14a.svg' className='w-[200px]'/></Link>


            <div className="flex items-center gap-0">
                <NavLink to='/login' exact={true} className={({ isActive }) => isActive ? "isActive" : ""} >
                    <Button className='rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1'>
                        <CgLogIn className='text-[18px] '/>Login
                    </Button>
                </NavLink>
                <NavLink to='/sign-up' exact={true} className={({ isActive }) => isActive ? "isActive" : ""}>
                    <Button className='rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1'>
                        <FaRegUser className='text-[15px] '/>Sign up
                    </Button>
                </NavLink>
            </div>
          </header>

          <div className="loginBox card w-[600px] h-[auto] pb-20  mx-auto pt-20 relative z-50">
             <div className="text-center">
                 <img src='./logo-short.18ca02a8.svg' className='m-auto'/>
             </div>

             <h1 className="text-center text-[35px] font-[700] mt-4"> Welcome Back! <br/>
              <span className="text-[#3872fa]"> You can change your password from here.</span> </h1>

             

             

             <br/>
             <form action="" className="w-full px-8 mt-3" onSubmit={handleSubmit}>
                

                <div className="form-group mb-4 w-full">
                  <h4 className="text-[14px] font-[500] mb-1">New Password</h4>
                  <div className="relative w-full">
                     <input type={isPasswordShow1===false ? 'password':'text'} className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)]
                     rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'  name='newPassword'  value={formFields.newPassword}
                         disabled={isLoading===true ? true:false}  onChange={onChangeInput} />
                     <Button className='!absolute top-[7px] right-[10px] z-50  !text-gray-600
                       !rounded-full ! w-[35px] !h-[35px] !min-w-[35px]' onClick={() => setIsPasswordShow1(!isPasswordShow1)}>
                        {
                          isPasswordShow1 === false ? ( 
                          <FaRegEye className='text-[18px]'/> 
                        ) :( 
                          <FaEyeSlash  className='text-[18px]'/>
                        )}
                        
                    </Button>
                  </div>
                </div>

                 <div className="form-group mb-4 w-full">
                  <h4 className="text-[14px] font-[500] mb-1">Confirm Password</h4>
                  <div className="relative w-full">
                     <input type={isPasswordShow2===false ? 'password':'text'} className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)]
                     rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'  value={formFields.confirmPassword} name="confirmPassword"
                         disabled={isLoading===true ? true:false} onChange={onChangeInput}/>
                     <Button className='!absolute top-[7px] right-[10px] z-50  !text-gray-600
                       !rounded-full ! w-[35px] !h-[35px] !min-w-[35px]' onClick={() => setIsPasswordShow2(!isPasswordShow2)}>
                        {
                          isPasswordShow2 === false ? ( 
                          <FaRegEye className='text-[18px]'/> 
                        ) :( 
                          <FaEyeSlash  className='text-[18px]'/>
                        )}
                        
                    </Button>
                  </div>
                </div>

                <div className="form-group mb-4 w-full flex items-center justify-between">
                   <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />

                </div>

                <Button className="btn-blue btn-lg w-full" type="submit" disabled={!valideValue}>
                  {
                      isLoading === true ?  <CircularProgress color="inherit" /> 
                      :
                       'Change Password'
                  }
                </Button>
             </form>
          </div>
      </section>
    </>
  )
}

export default ChangePassword

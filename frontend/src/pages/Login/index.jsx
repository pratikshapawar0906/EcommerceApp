import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const Context=useContext(MyContext)
    const[isLoading,setIsLoading]=useState(false);
    const [isShowPassword, setIsShowPassword]=useState(false);
    const[formFields, setFormFields]=useState({email:'', password:''})

    const history=useNavigate()

    const forgotPassword =(e)=>{
        e.preventDefault();
        setIsLoading(true);
        if(formFields.email === "" ){
           Context.alertBox("error", "Please add Email ");
            return false
        }       
        else{
            Context.alertBox( "success",   `OTP  send to ${formFields.email} you!` );
            localStorage.setItem("userEmail",formFields.email);
            localStorage.setItem("actionType",'forgot-password');

            postData("/api/user/forgot-password",{
              email:formFields.email,
            }).then((res)=>{
                if(res?.success){
                   Context.alertBox( "success",  res?.message || "Verify OTP successfull!" );
                   setIsLoading(false)
                   history('/verify')
                   
                } else {
                   Context.alertBox( "error", res?.message || "Something went wrong!" );
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                setIsLoading(false);
              Context.alertBox( "error",  "Server error!" );
              console.error(err);
            });
            // history("/verify")
        }
         
    }

    
    
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
            if(formFields.email === "" ){
               Context.alertBox("error", "Please add Email ");
                return 
            }
            if(formFields.password === ""){
            Context.alertBox("error", "Please add Password")
            return 
        }
        postData("/api/user/login", formFields,{ withCredentials :true}).then((res)=>{
            if(res?.success){
               Context.alertBox( "success",  res?.message || "Login successful!" );
               setIsLoading(false)
               setFormFields({
                   email:'', password:''
               })
               localStorage.setItem("accesstoken",res?.data?.accesstoken)
               localStorage.setItem("refreshtoken",res?.data?.refreshtoken)
               setIsLoading(true);
               history('/')
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
        <section className="section py-10">
            <div className="conatiner">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-[#ffffff]
                p-4 px-10">
                <h3 className=" text-center text-[#000] text-[18px]">Login to Your Account </h3>

                <form action="" className="w-full mt-5" onSubmit={handleSubmit}>
                    <div className="form-group w-fill mb-5">
                         <TextField  type='email'  id="email" label="Email Id" value={formFields.email} variant="outlined" className='w-full' name='email' onChange={onChangeInput}
                         disabled={isLoading===true ? true:false}/>
                    </div>

                    <div className="form-group w-fill relative">
                         <TextField type={isShowPassword === false ? 'password' : 'text'} id="Password"  value={formFields.password} label="Password" variant="outlined" className='w-full' name="password" 
                         disabled={isLoading===true ? true:false} onChange={onChangeInput}/>
                         <Button type="button"className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px]  !min-w-[35px]
                         !rounded-full !text-[#000]' onClick={()=>{setIsShowPassword(!isShowPassword)}}>
                            {
                               isShowPassword === true  ? <IoMdEye className='text-[20px] opacity-75'/> : <IoMdEyeOff className='text-[20px] opacity-75'/>
                            }
                         </Button>
                    </div>

                    <a href="#" className="link cursor-pointer text-[14px] font-[600]" onClick={forgotPassword}>Forgot Password</a>

                    <div className="flex items-center  w-full mt-3 mb-3">
                        <Button type="submit" disabled={!valideValue} className='btn-org btn-lg w-full'>
                            {
                                isLoading === true ?  <CircularProgress color="inherit" /> 
                                :
                                 'Login'
                            }
                        </Button>
                    </div>

                    <p className='text-center'>Not Registred 
                        <Link to='/register' className='link text-[14px] font-[600] text-[#ff5252]'>Sign up</Link>
                    </p>

                    <p className='text-center font-[500]'>Or continue with social account</p>

                    <Button className='flex gap-3 w-full !bg-[#f1f1f1] btn-lf !text-[#000]'>
                        <FcGoogle className='text-[20px]'/>Login with Google</Button>
                </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default Login

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useContext, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { postData } from '../../utils/api'
import { MyContext } from '../../App'

const Register = () => {
   const [isShowPassword, setIsShowPassword]=useState(false);
   const [formFields, setFormFields]=useState({
     name:"",email:"",password:"",
   })

   const Context=useContext(MyContext)

   const onChangeInput=(e)=>{
    const {name, value}= e.target;
    setFormFields(()=>{
        return{
            ...formFields,
            [name]:value
        }
    })
   }

   const handleSubmit=(e)=>{
    e.preventDefault();
    if(formFields.name === ""){
        Context.alertBox("error", "Please add full name")
        return 
    }
    if(formFields.email === ""){
        Context.alertBox("error", "Please add email")
        return 
    }
    if(formFields.password === ""){
        Context.alertBox("error", "Please add Password")
        return 
    }
    postData("/api/user/register", formFields).then((res)=>{
        console.log(res)
    if(res?.success){
       Context.alertBox( "success",  "Registration successful!" );
    } else {
       Context.alertBox( "error",  res?.message || "Something went wrong!" );
    }
    })
    .catch((err) => {
      Context.alertBox( "error","Server error!" );
      console.error(err);
    });
   }

  return (
    <>

    <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-[#ffffff]
                p-4 px-10">
                <h3 className=" text-center text-[#000] text-[18px]">Register with a new Account </h3>

                <form action="" className="w-full mt-5" onSubmit={handleSubmit}>
                  <div className="form-group w-fill mb-5">
                         <TextField  type='text'  id="name" label="Full Name" name="name" variant="outlined" className='w-full' onChange={onChangeInput}/>
                    </div>
                    <div className="form-group w-fill mb-5">
                         <TextField  type='email'  id="email" label="Email Id" name="email" variant="outlined" className='w-full' onChange={onChangeInput}/>
                    </div>

                    <div className="form-group w-fill relative">
                         <TextField type={isShowPassword === false ? 'password' : 'text'} id="Password" name="password" label="Password" variant="outlined" className='w-full'  onChange={onChangeInput}/>
                         <Button type="button" className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px]  !min-w-[35px]
                         !rounded-full !text-[#000]' onClick={()=>{setIsShowPassword(!isShowPassword)}}>
                            {
                               isShowPassword === true  ? <IoMdEye className='text-[20px] opacity-75'/> : <IoMdEyeOff className='text-[20px] opacity-75'/>
                            }
                         </Button>
                    </div>

                    

                    <div className="flex items-center  w-full mt-3 mb-3">
                        <Button type='submit' className='btn-org btn-lg w-full'>Register</Button>
                    </div>

                    <p className='text-center'>Alredy have an account? <Link to='/login' className='link text-[14px] font-[600] text-[#ff5252]'>Login</Link></p>

                    <p className='text-center font-[500]'>Or continue with social account</p>

                    <Button className='flex gap-3 w-full !bg-[#f1f1f1] btn-lf !text-[#000]'>
                        <FcGoogle className='text-[20px]'/>Register with Google</Button>
                </form>
                </div>
            </div>
        </section>
      
    </>
  )
}

export default Register

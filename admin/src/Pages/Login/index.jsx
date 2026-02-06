import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { CgLogIn } from "react-icons/cg";
import { FaRegEye, FaRegUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash, FaFacebook } from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MyContext } from '../../App'
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';


const Login = () => {
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingFb, setLoadingFb] = useState(false);
    const[isLoading,setIsLoading]=useState(false);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const[formFields, setFormFields]=useState({email:'', password:''})
    const Context=useContext(MyContext)

    function handleClickGoogle() {
      setLoadingGoogle(true);
    }
   
    function handleClickFb() {
      setLoadingFb(true);
    }

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
                   history('/verify-account')
                   
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
                return  false
            }
            if(formFields.password === ""){
            Context.alertBox("error", "Please add Password")
            return false
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
              <span className="text-[#3872fa]"> Sign in with your credentials.</span> </h1>

             <div className="flex items-center justify-center w-full mt-5 gap-5">
                 <Button
                   size='small'
                   onClick={handleClickGoogle}
                   startIcon={<FcGoogle />}
                   loading={loadingGoogle}
                   loadingPosition="end"
                   variant="outlined"
                   className='!bg-none !text-[15px] !capitalize !py-2 !px-5 !text-[rgba(0,0,0,0.7)]'
                 >
                   Sign in with Google
                 </Button>

                 <Button
                   size='small'
                   onClick={handleClickFb}
                   startIcon={<FaFacebook  />}
                   loading={loadingFb}
                   loadingPosition="end"
                   variant="outlined"
                   className='!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]'
                 >
                   Sign in with Facebbok
                 </Button>
             </div>

             <br/>
             <div className="w-full flex items-center justify-center gap-3">
              <span className="flex items-center w-[100px] h-[2px] bg-[rgba(0,0,0,0.2)]"></span>
                 <span className="text-[14px] font-[500]">Or, Sign up with your email</span>
              <span className="flex items-center w-[100px] h-[2px] bg-[rgba(0,0,0,0.2)]"></span>
             </div>

             <br/>
             <form action="" className="w-full px-8 mt-3"  onSubmit={handleSubmit}>
                <div className="form-group mb-4 w-full">
                  <h4 className="text-[14px] font-[500] mb-1">Email</h4>
                  <input type='email' className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)]
                  rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' name='email' value={formFields.email}  onChange={onChangeInput}  disabled={isLoading===true ? true:false}/>
                </div>

                <div className="form-group mb-4 w-full">
                  <h4 className="text-[14px] font-[500] mb-1">Password</h4>
                  <div className="relative w-full">
                     <input type={isPasswordShow===false ? 'password':'text'} className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)]
                     rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' name='password' value={formFields.password}  onChange={onChangeInput}  disabled={isLoading===true ? true:false}/>
                     <Button className='!absolute top-[7px] right-[10px] z-50  !text-gray-600
                       !rounded-full ! w-[35px] !h-[35px] !min-w-[35px]' onClick={()=>setIsPasswordShow(!isPasswordShow)}>
                        {
                          isPasswordShow === false ? ( 
                          <FaRegEye className='text-[18px]'/> 
                        ) :( 
                          <FaEyeSlash  className='text-[18px]'/>
                        )}
                        
                    </Button>
                  </div>
                </div>

                <div className="form-group mb-4 w-full flex items-center justify-between">
                   <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />

                   <a className='text-[#3872fa] font-[700] text-[15px] hover:underline hover:text-gray-700'  onClick={forgotPassword}>Forgot Password?</a>
                </div>

                <Button className="btn-blue btn-lg w-full"  type="submit" disabled={!valideValue}>
                  {
                        isLoading === true ?  <CircularProgress color="inherit" /> 
                        :
                         'Sign in'
                    }
                  </Button>
             </form>
          </div>
      </section>
    </>
  )
}

export default Login

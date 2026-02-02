import React, { createContext, useEffect, useState } from 'react'
import './App.css'
import Header from './Component/Header'
import Home from './pages/Home'
import { BrowserRouter as  Router, Route, Routes, Link } from 'react-router-dom'
import ProductListing from './pages/ProductListing'
import Footer from './Component/Footer';
import ProductDetails from './pages/ProductDetails'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button'
import ProductZoom from './Component/ProductZoom'
import { IoMdClose } from "react-icons/io";
import ProductDetailsModel from './Component/ProductDetailsModel'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Verify from './pages/Verify'
import toast, {Toaster} from 'react-hot-toast'
import ForgotPassword from './pages/ForgotPassword'
import Checkout from './pages/Checkout'
import MyAccount from './pages/MyAccount'
import MyList from './pages/Mylist'
import Orders from './pages/Orders'
import { fetchDataFromApi } from './utils/api'


const MyContext = createContext();
const App = () => {

  const [openProductDetailsModel, setOpenProductDetailsModel] = useState(false);
  const [maxWidth, setMaxWidth] = useState('lg');
  const [fullWidth, setFullWidth] = useState(true);
  const [openCartPanel, setOpenCartPanel] =useState(false);
  const[isLogin, setIsLogin]=useState(false)
  const [userData,setUserData]=useState(null)
  const apiUrl=import.meta.env.VITE_API_URL


  const handleCloseProductDetailsModel = () => {
    setOpenProductDetailsModel(false);
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };

 useEffect(() => {
  const token = localStorage.getItem("accesstoken");
  setIsLogin(!!token);
   if (!token) {
    setIsLogin(false);
    return;
  }
  fetchDataFromApi(`/api/user/userDetails?token=${token}`).then((res)=>{
    setUserData(res.data);
    if(res.response?.data.error===true){
      if(res.response?.data.message==="You have not login"){
        localStorage.setItem("accesstoken",res?.data?.accesstoken);
        localStorage.setItem("refreshToken",res?.data?.refreshToken);
        alertBox("error","Your session is Closed Please Login Again")
        setIsLogin(false)
      }
    }
  })
}, [isLogin]);


  const alertBox=(type,msg)=>{
    if(type==="success"){
      toast.success(msg)
    }
    if(type==="error"){
      toast.error(msg)
    }
    
  }
  
  const Values={
    setOpenProductDetailsModel,
    setOpenCartPanel,
    openCartPanel,
    toggleCartPanel,
    isLogin,
    setIsLogin,
    alertBox,
    userData,
    setUserData
    
  }
  return (
    <>
     <Router>
      <MyContext.Provider value={Values}>
      
       <Header/>
       <Routes>
          <Route path={"/"}  element={<Home/>} />
           <Route path={"/productListing"}  element={<ProductListing/>} />
           <Route path={"/productDetails/:id"}  element={<ProductDetails/>} />
           <Route path={"/login"}  element={<Login/>} />
           <Route path={"/register"}  element={<Register/>} />
           <Route path={"/cart"}  element={<Cart/>} />
           <Route path={"/verify"}  element={<Verify/>} />
           <Route path={"/forgotpassword"}  element={<ForgotPassword/>} />
           <Route path={"/checkout"}  element={<Checkout/>} />
           <Route path={"/my-account"}  element={<MyAccount/>} />
           <Route path={"/my-list"}  element={<MyList/>} />
           <Route path={"/my-orders"} element={<Orders/>} />
       </Routes>
       <Footer />
       </MyContext.Provider>
     </Router>

      <Toaster/>
      <Dialog
        open={openProductDetailsModel}
        onClose={handleCloseProductDetailsModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailModel'
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        
        <DialogContent>
          <div className="flex items-center w-full productDetails relative">
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]
            !absolute top-[15px] right-[15px] !bg-[#f1f1f1]' onClick={handleCloseProductDetailsModel}>
              <IoMdClose className='text-[20px]'/></Button>
            <div className="col1 w-[40%]">
              <ProductZoom/>
            </div>

            <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
              <ProductDetailsModel/>
            </div>
          </div>
        </DialogContent>
        
      </Dialog>
     
      
    </>
  )
}

export default App

export {MyContext}

import React, { forwardRef, useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes ,Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Header from './Component/Header'
import Sidebar from './Component/Sidebar'
import { createContext } from 'react'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Products from './Pages/Products'
import AddProducts from './Pages/Products/AddProducts'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { IoMdClose } from "react-icons/io";
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import HomeSliderBanner from './Pages/HomeSliderBanner'
import AddHomeSlider from './Pages/HomeSliderBanner/addHomeSlider'
import Category from './Pages/Category'
import AddCategory from './Pages/Category/AddCategory'
import AddSubCategoryList from './Pages/Category/AddSubCategoryList'
import SubCategoryList from './Pages/Category/SubCategoryList'
import Users from './Pages/Users'
import Orders from './Pages/Orders'
import ForgotPassword from './Pages/ForgotPassword'
import Verify from './Pages/Verify'
import ChangePassword from './Pages/ChangePassword'
import toast, {Toaster} from 'react-hot-toast'
import { fetchDataFromApi } from './utils/api'
import Profile from './Pages/Profile'
import Address from './Pages/Address/AddAddress'
import EditCategory from './Pages/Category/EditCategory'
import EditProduct from './Pages/Products/EditProduct'
import ProductDeatails from './Pages/Products/ProductDeatails'
import AddRAMS from './Pages/Products/AddRAMS'




const MyContext =createContext();


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function App() {
  const [isSidebarOpen, setIsSidebarOpen]=useState(true);
  const [isLogin, setIsLogin]=useState(false);
  const [userData,setUserData]=useState(null)
  const[address ,setAddress]=useState([])
  const [categories, setCategories] = useState([]);
  const[productData,setProductData]=useState([])
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel]=useState({
    open:false,
    model:'',
    id:""
  });
  const [catData,setCatData]=useState([]);

  const alertBox=(type,msg)=>{
    if(type==="success"){
      toast.success(msg)
    }
    if(type==="error"){
      toast.error(msg)
    }
    
  }
 

  const router= createBrowserRouter([
    {
      path:"/",
      exact:true,
      element:(
        <> 
        <section className="main">
          <Header/>
           <div className="contentMain flex">
             <div className='sidebarWrapper w-[18%]'>
               <Sidebar/>
             </div>

             <div className={`contentRight !py-4 !px-5  ${isSidebarOpen === true ? 'w-[82%] ' :"w-[98%]"} transition-all`}>
              <Dashboard/>
             </div>
           </div>
        </section>
        </>
      )
    },
    {
      path:"/login",
      exact:true,
      element:(
        <> 
          <Login/>
        </>
      )
    },
    {
      path:"/sign-up",
      exact:true,
      element:(
        <> 
          <SignUp/>
        </>
      )
    },
    {
      path:"/products",
      exact:true,
      element:(
        <> 
          <section className="main">
          <Header/>
           <div className="contentMain flex">
             <div className='sidebarWrapper w-[18%]'>
               <Sidebar/>
             </div>

             <div className={`contentRight !py-4 !px-5  ${isSidebarOpen === true ? 'w-[82%] ' :"w-[98%]"} transition-all`}>
              <Products/>
             </div>
           </div>
        </section>
        </>
      )
    },
    {
      path:"/product/upload",
      exact:true,
      element:(
        <> 
           <AddProducts/>   
        </>
      )
    },
    {
      path:"/homeSlider/list",
      exact:true,
      element:(
        <> 
          <section className="main">
          <Header/>
           <div className="contentMain flex">
             <div className='sidebarWrapper w-[18%]'>
               <Sidebar/>
             </div>

             <div className={`contentRight !py-4 !px-5  ${isSidebarOpen === true ? 'w-[82%] ' :"w-[98%]"} transition-all`}>
              <HomeSliderBanner/>
             </div>
           </div>
        </section>
        </>
      )
    },
    {
      path:"/category/list",
      exact:true,
      element:(
        <> 
          <section className="main">
          <Header/>
           <div className="contentMain flex">
             <div className='sidebarWrapper w-[18%]'>
               <Sidebar/>
             </div>

             <div className={`contentRight !py-4 !px-5  ${isSidebarOpen === true ? 'w-[82%] ' :"w-[98%]"} transition-all`}>
              <Category/>
             </div>
           </div>
        </section>
        </>
      )
    },
    {
      path:"/SubCategory/list",
      exact:true,
      element:(
        <> 
          <section className="main">
          <Header/>
           <div className="contentMain flex">
             <div className='sidebarWrapper w-[18%]'>
               <Sidebar/>
             </div>

             <div className={`contentRight !py-4 !px-5  ${isSidebarOpen === true ? 'w-[82%] ' :"w-[98%]"} transition-all`}>
              <SubCategoryList/>
             </div>
           </div>
        </section>
        </>
      )
    },
    {
      path:"/users",
      exact:true,
      element:(
        <> 
          <section className="main">
          <Header/>
           <div className="contentMain flex">
             <div className='sidebarWrapper w-[18%]'>
               <Sidebar/>
             </div>

             <div className={`contentRight !py-4 !px-5  ${isSidebarOpen === true ? 'w-[82%] ' :"w-[98%]"} transition-all`}>
              <Users/>
             </div>
           </div>
        </section>
        </>
      )
    },
     {
      path:"/profile",
      exact:true,
      element:(
        <> 
          <section className="main">
          <Header/>
           <div className="contentMain flex">
             <div className='sidebarWrapper w-[18%]'>
               <Sidebar/>
             </div>

             <div className={`contentRight !py-4 !px-5  ${isSidebarOpen === true ? 'w-[82%] ' :"w-[98%]"} transition-all`}>
              <Profile/>
             </div>
           </div>
        </section>
        </>
      )
    },
    {
      path:"/orders",
      exact:true,
      element:(
        <> 
          <section className="main">
          <Header/>
           <div className="contentMain flex">
             <div className='sidebarWrapper w-[18%]'>
               <Sidebar/>
             </div>

             <div className={`contentRight !py-4 !px-5  ${isSidebarOpen === true ? 'w-[82%] ' :"w-[98%]"} transition-all`}>
              <Orders/>
             </div>
           </div>
        </section>
        </>
      )
    },
    {
      path:"/forgot-password",
      exact:true,
      element:(
        <> 
          <ForgotPassword/>
        </>
      )
    },
    {
      path:"/verify-account",
      exact:true,
      element:(
        <> 
          <Verify/>
        </>
      )
    },
    {
      path:"/change-password",
      exact:true,
      element:(
        <> 
          <ChangePassword/>
        </>
      )
    },
    {
      path:"/productDetail/:id",
      exact:true,
      element:(
        <> 
          <section className="main">
          <Header/>
           <div className="contentMain flex">
             <div className='sidebarWrapper w-[18%]'>
               <Sidebar/>
             </div>

             <div className={`contentRight !py-4 !px-5  ${isSidebarOpen === true ? 'w-[82%] ' :"w-[98%]"} transition-all`}>
              <ProductDeatails/>
             </div>
           </div>
        </section>
        </>
      )
    },
    {
      path:"/productDetail/addRAMS",
      exact:true,
      element:(
        <> 
          <section className="main">
          <Header/>
           <div className="contentMain flex">
             <div className='sidebarWrapper w-[18%]'>
               <Sidebar/>
             </div>

             <div className={`contentRight !py-4 !px-5  ${isSidebarOpen === true ? 'w-[82%] ' :"w-[98%]"} transition-all`}>
              <AddRAMS/>
             </div>
           </div>
        </section>
        </>
      )
    },
    
    
  ])

  useEffect(() => {
  const token = localStorage.getItem("accesstoken");

  if (!token) {
    setIsLogin(false);
    return;
  }

  setIsLogin(true);
  
    fetchDataFromApi(`/api/user/userDetails`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch(error => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        forceLogout("Session expired. Please login again.");
      }
    });
  }, []);


  useEffect(()=>{
    getCat();
  },[])

  const forceLogout = (message) => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
  
    setIsLogin(false);
    setUserData(null);
  
    alertBox("error", message);
  
    window.location.href = "/login";
  };

  
  const getCat=()=>{
    fetchDataFromApi("/api/category").then((res)=>{
       setCatData(res?.data)
     })
  }

  const values={
    isSidebarOpen,
   setIsSidebarOpen,
   isLogin,
   setIsLogin,
   isOpenFullScreenPanel,
   setIsOpenFullScreenPanel,
   alertBox,
   userData,
   setUserData,
   setAddress,
   address,
   catData,
   setCatData,
   getCat,
   categories,
  setCategories,
   productData,
  setProductData,
  forceLogout
   
  }

  return (
    <>
    <MyContext.Provider  value={values}>
      <RouterProvider router={router}/>

   
      <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={()=>setIsOpenFullScreenPanel({
          open:false
        })}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setIsOpenFullScreenPanel({
                open:false
              })}
              aria-label="close"
            >
              <IoMdClose className='text-gray-800' />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">{isOpenFullScreenPanel?.model}</span>
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={()=>setIsOpenFullScreenPanel({
              open:false
            })}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        { 
           isOpenFullScreenPanel?.model === 'Add Product' && <AddProducts />
        }
        { 
           isOpenFullScreenPanel?.model === 'Add Home Slider' && <AddHomeSlider />
        }
        { 
           isOpenFullScreenPanel?.model === 'Add New Category' && <AddCategory />
        }
        {
          isOpenFullScreenPanel?.model ==='Add New Subcategory' && <AddSubCategoryList/>
        }
        {
          isOpenFullScreenPanel?.model ==='Add New Address' && <Address/>
        }
        {
          isOpenFullScreenPanel?.model ==='Edit Category' && <EditCategory/>
        }
        {
          isOpenFullScreenPanel?.model ==='Edit Product' && <EditProduct/>
        }
        
      </Dialog>
        <Toaster/>
    </MyContext.Provider>
    </>
  )
}

export default App;

export {MyContext}
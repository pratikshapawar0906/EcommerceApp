import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Search from '../search'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Tooltip from '@mui/material/Tooltip';
import Navigation from './Navigation';
import { MyContext } from '../../App';
import Button from '@mui/material/Button';
import { FaRegUser} from "react-icons/fa";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { IoBagHandleOutline } from 'react-icons/io5';



const Header = () => {
  const Context=useContext(MyContext)

   const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: '0 4px',
    },
  }));


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <header className='bg-white'>
        <div className="top-strip py-2 border-t-[1px] border-greay-100 border-b-[1px]">
          <div className="container">
            <div className="flex items-center justify-between">
                <div className="coll w-[50%]">
                    <p className=" text-[12px] font-[500]">Get up to 50% off new season styles. limited time only</p>
                </div>
                <div className="col2 flex items-center justify-end">
                    <ul className='flex items-center gap-3 '>
                        <li className='list-none'>
                            <Link to="/help-center" className='text-[13px] link font-[500] transition'>Help Center</Link>
                        </li>
                         <li className='list-none'>
                            <Link to="/Order-tracking" className='text-[13px] link font-[500] transition'>Order Tracking</Link>
                        </li>
                         <li className='list-none'>
                            <Link to="#" className='text-[13px] link font-[500] transition'>Help Center</Link>
                        </li>
                         <li className='list-none'>
                            <Link to="#" className='text-[13px] link font-[500] transition'>Help Center</Link>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        </div>

        <div className="header py-4 border-greay-100 border-b-[1px]">
          <div className="container flex items-center justify-between">
            <div className="col1 w-[25%]">
              <Link to={"/"}><img src='/logo.jpg'/></Link>
            </div>
            <div className="col2 w-[40%]">
               <Search/>
            </div>
            <div className="col3 w-[35%] flex items-center pl-7">
              <ul className='flex items-center gap-3  w-full justify-end'>
                {
                  Context.isLogin == false ?
                  <li className='list-none'>
                    <Link to='/login' className='link transition text-[15px] font-[500]'>
                    Login</Link> | &nbsp;
                    <Link to="/register" className='link transition text-[15px] font-[500]' >
                    Register</Link>
                </li>
                :
                <>
                 <Button className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                 onClick={handleClick}>
                  <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]'>
                    <FaRegUser className='text-[16px] text-[rgba(0,0,0,0.7)]'/></Button>

                    <div className="info">
                      <h4 className="text-[14px] font-[500]  text-[rgba(0,0,0,0.6)]capitalize text-left justify-start">abd tikas</h4>
                     
                    </div>
                 </Button>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  > 
                    <Link to='/my-account' className='w-full block'>
                      <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                        <FaRegUser  className='text-[18px]' />  <span className="text-[14px]">My Account </span>
                      </MenuItem>
                    </Link>
                    <Link to='/my-orders' className='w-full block'>
                    <MenuItem onClick={handleClose} className='flex gap-2  !py-2'>
                      <IoBagHandleOutline  className='text-[18px]'/> <span className="text-[14px]">Orders</span>
                    </MenuItem>
                     </Link>
                     <Link to='/my-list' className='w-full block'>
                     <MenuItem onClick={handleClose} className='flex gap-2  !py-2'>
                      <MdOutlineFavoriteBorder className='text-[18px]' /> <span className="text-[14px]">My List</span>
                    </MenuItem>
                     </Link>
                    
                     <MenuItem onClick={handleClose} className='flex gap-2  !py-2'>
                      <FiLogOut className='text-[18px]' /> <span className="text-[14px]">Logout</span>
                    </MenuItem>
                   
                  </Menu>
                 </>
                }
                
                <li>
                  <Tooltip title="Compare">
   
                    <IconButton aria-label="cart" >
                      <StyledBadge badgeContent={4} color="secondary">
                        <IoIosGitCompare />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="wish list">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={4} color="secondary">
                        <CiHeart />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Shopping cart">
                    <IconButton aria-label="cart" onClick={()=>{Context. setOpenCartPanel(true)}}>
                      <StyledBadge badgeContent={4} color="secondary">
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Navigation/>
    </header>
      
    </>
  )
}

export default Header
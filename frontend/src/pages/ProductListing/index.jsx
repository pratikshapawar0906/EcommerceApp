import React, { useState } from 'react'
import SideBar from '../../Component/SideBar'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductItem from '../../Component/ProductItem';
import Button from '@mui/material/Button';
import { IoGrid } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductItemListView from '../../Component/ProductItemListView';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ProductListing = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [itemView, setItemView] =useState('grid')
  return (
    <>
      <section className='py-5 pb-0'>
          <div className='container'>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/" className='link transition-all'>
               Home
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/"
                className='link transition-all'
              >
                Fashion
              </Link>
            </Breadcrumbs>
          </div>

          
          <div className="bg-[#ffffff] p-2 mt-4">
            <div className="container flex gap-3">
              <div className="sidebarWrapper w-[20%] h-full bg-[#ffffff] p-3">
                <SideBar/>
              </div>

              <div className="rightContent w-[80%]  py-3">

                <div className="bg-[#f1f1f1] p-2 w-full mb-4 rounded-md 
                flex items-center justify-between">
                  <div className="col1 flex items-center itemViewAction ">
                    <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full 
                    !text-[#000] ${itemView=== "list" && 'active'}`} onClick={()=>setItemView('list')}>
                      <MdMenu className='text-[rgba(0,0,0,0.7)]'/>
                    </Button>

                    <Button className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full 
                    !text-[#000] ${itemView=== "grid" && 'active'}`} onClick={()=>setItemView('grid')}>
                      <IoGrid className='text-[rgba(0,0,0,0.7)]'/>
                    </Button>

                    <span className='text-[14px] pl-3 text-[rgba(0,0,0,0.8)] font-[500]'> There are 27 Product</span>
                  </div>

                  <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                    <span className='text-[14px] pl-3 text-[rgba(0,0,0,0.8)] font-[500]'> Sort By :</span>

                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      className=' !bg-[#ffffff] !text-[12px] !text-[#000] !capitalize
                      !border-1 !border-[#000]'
                    >
                      Relevance
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        list: {
                          'aria-labelledby': 'basic-button',
                        },
                      }}
                    >
                      <MenuItem onClick={handleClose}  className='  !text-[12px] !text-[#000] !capitalize'>Sales,highest to lowest</MenuItem>
                      <MenuItem onClick={handleClose}  className='  !text-[12px] !text-[#000] !capitalize'>Name, A to Z</MenuItem>
                      <MenuItem onClick={handleClose}  className='  !text-[12px] !text-[#000] !capitalize'>Name, Z to A</MenuItem>
                      <MenuItem onClick={handleClose}  className='  !text-[12px] !text-[#000] !capitalize'>Price, high to Low</MenuItem>
                      <MenuItem onClick={handleClose}  className='  !text-[12px] !text-[#000] !capitalize'>Price, Low to high</MenuItem>
                    </Menu>
                  </div>
                </div>

                <div className={`grid gap-4 ${  itemView === 'grid'    ? 'grid-cols-4'    : 'grid-cols-1'}`}>
                  {
                    itemView==='grid' ? (
                    <>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    <ProductItem/>
                    </>
                     ):(
                      <>
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView />
                    <ProductItemListView /></>
                   )}
                  
                </div>

                <div className="flex items-center justify-center mt-5 ">
                  <Pagination count={10} showFirstButton showLastButton />
                </div>
              </div>
          </div>
          </div>
      </section>
    </>
  )
}

export default ProductListing

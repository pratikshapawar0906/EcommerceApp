import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TooltipMUI from '@mui/material/Tooltip'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableBody from '@mui/material/TableBody'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ProgressBar from '../../Component/ProgressBar';
import { FiEdit3 } from 'react-icons/fi'
import {  FaEye, FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom';
import SearchBox from '../../Component/SearchBox';
import { MyContext } from '../../App'
import { deleteData, deleteMultipleData, fetchDataFromApi } from '../../utils/api'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const columns = [
 
  { id: 'Product', label: 'Product', minWidth: 170 },
  { id: 'Category', label: 'Category', minWidth: 180 },
  {
    id: 'Sub Category',
    label: 'Sub Category',
    minWidth: 150,
   
  },

  {
    id: 'Price',
    label: 'Price',
    minWidth: 170,
   
  },
    {
    id: 'Sales',
    label: 'Sales',
    minWidth: 150,
    
    
    },
     {
    id: 'Action',
    label: 'Action',
    minWidth: 150,
   
    
    }

];

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

const Products = () => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [categorySubFilter, setCategorySubFilter] = useState('');
    const [categoryThridSubFilter, setCategoryThridSubFilter] = useState('');
    
   const [filteredProducts, setFilteredProducts] = useState([]);
    const Context=useContext(MyContext)
    const [sortedIds,setSortedIds]=useState([]);
    

    useEffect(() => {
      fetchDataFromApi("/api/product/getAllProducts").then((res) => {
        Context?.setProductData(res?.data);
      });
    }, [Context?.isOpenFullScreenPanel]);


    const handleChangeCatFilter = (event) => {
      setCategoryFilter(event.target.value);  
      fetchDataFromApi(`/api/product/getProdByCatId/${event.target.value}`)
      .then((res)=>{
        Context?.setProductData(res?.data);
      })
    };

    const handleChangeSubCatFilter = (event) => {
     setCategorySubFilter(event.target.value);
     fetchDataFromApi(`/api/product/getProdBySubCatId/${event.target.value}`)
      .then((res)=>{
        Context?.setProductData(res?.data);
      })
    };

    const handleChangeThirdSubCatFilter = (event) => {
      setCategoryThridSubFilter(event.target.value);
      fetchDataFromApi(`/api/product/getProdByThirdSubCatId/${event.target.value}`)
      .then((res)=>{
        Context?.setProductData(res?.data);
      })
    };

    


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(event.target.value);
      setPage(0);
    };

    const deleteProduct=(id)=>{
         deleteData(`/api/product/deleteProduct/${id}`).then((res)=>{
             fetchDataFromApi("/api/product/getAllProducts").then((res)=>{
               Context?.setProductData(res?.data)
               Context.alertBox("Success","Product deleted")
             })
         })
    }

    const deleteMultipleProduct=()=>{
      if(sortedIds.length == 0){
            Context.alertBox("error","Please select items to delete")
            return false
      }

      console.log(sortedIds);
      try {
        deleteMultipleData(`/api/product/deleteMultipleProduct`,
         {ids:sortedIds},
        ).then((res)=>{
             fetchDataFromApi("/api/product/getAllProducts").then((res)=>{
               Context?.setProductData(res?.data)
               Context.alertBox("Success","Product deleted")
             })
         })
        
      } catch (error) {
        
      }
    }
  return (
    <>
       <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[700]">Products <span className='font-[400] text-[14px]'> </span></h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          {
            sortedIds?.length!==0 && <Button variant='contained' className='btn-blue !bg-green-500 btn-sm '
            onClick={deleteMultipleProduct}
            >Delete</Button>
          }
            <Button className='btn-blue !bg-green-500 btn-sm '>Export</Button>
            <Button className='btn-blue btn-sm !text-white' onClick={()=>Context.setIsOpenFullScreenPanel({
                open:true,
                model:'Add Product'
            })}>Add Product</Button>
        </div>
       </div>

       <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
       

        <div className="flex items-center w-full px-5 justify-between gap-5">
            <div className="col w-[15%]">
                <h4 className="text-[12px] font-[600] mb-3">Category</h4>
                <Select
                style={{ zoom:'80%'}}
                className='w-full '
                size='small'
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={categoryFilter}
                  onChange={handleChangeCatFilter}
                  label="Category"
                >
                 {
                    Context?.catData?.length !==0 && Context?.catData?.map((item,index)=>{
                        return(
                         
                           <MenuItem  key={index} value={item?._id} >{item?.name}</MenuItem>
                    
                        )
                      })
                  }
                </Select>
            </div>
            <div className="col w-[15%]">
                <h4 className="text-[12px] font-[600] mb-3">Sub Category</h4>
                <Select
                style={{ zoom:'80%'}}
                className='w-full '
                size='small'
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={categorySubFilter}
                  onChange={handleChangeSubCatFilter}
                  label="Category"
                >

                  {
                    Context?.catData?.length !==0 && Context?.catData?.map((item)=>{
                        return(
                           item?.children?.length !==0 && item?.children.map((subcat,index_)=>{
                            return(
                              <MenuItem  key={index_} value={subcat?._id} >{subcat?.name}</MenuItem>
                            )
                           })
                        )
                      })
                  }
                </Select>
            </div>
            <div className="col w-[15%]">
                <h4 className="text-[12px] font-[600] mb-3">Thrid Sub Category</h4>
                <Select
                style={{ zoom:'80%'}}
                className='w-full '
                size='small'
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={categoryThridSubFilter}
                  onChange={handleChangeThirdSubCatFilter}
                  label="Category"
                >
                {
                    Context?.catData?.length !==0 && Context?.catData?.map((item)=>{
                        return(
                            item?.children.map((subcat)=>{
                            return(
                              subcat?.children?.length !==0 && subcat?.children?.map((thridsubcat,index_)=>{
                                return(
                                   <MenuItem  key={index_} value={thridsubcat?._id} >{thridsubcat?.name}</MenuItem>
                                )
                              })
                            )
                           })
                        )
                      })
                  }
                </Select>
            </div>
            <div className="col w-[20%] ml-auto">
                <SearchBox/>
            </div>

           
        </div>
        <br/>  
        
    
    <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
                <TableCell>
                     <Checkbox {...label}  
                     checked={
                          Context?.productData?.length > 0 &&
                          sortedIds.length === Context.productData.length
                        }
                        indeterminate={
                          sortedIds.length > 0 &&
                          sortedIds.length < Context.productData.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            const allIds = Context.productData.map(item => item._id);
                            setSortedIds(allIds);
                          } else {
                            setSortedIds([]);
                          }
                        }}
                     size='small'/>
                </TableCell>
              {columns.map((column) => (
                <TableCell padding="checkbox"
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                   
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
           </TableHead>
           <TableBody>
           {
            Context?.productData?.length !== 0 &&     Context?.productData?.slice(
              page * rowsPerPage, 
              page * rowsPerPage +rowsPerPage
            ) 
            ?.map((item,index)=>{
                return(
                <TableRow key={item?._id}>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label}  checked={sortedIds.includes(item._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSortedIds(prev => [...prev, item._id]);
                          } else {
                            setSortedIds(prev => prev.filter(id => id !== item._id));
                          }
                        }}  size='small'/>
                     
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-4 w-[300px]">
                                           
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to={`/product/${item?._id}`}>
                               <LazyLoadImage src={item.images[0]} className='w-full group-hover:scale-105 transition-all' 
                               effect='blur'/>
                            </Link>
                        </div>
                        <div className="info w-[75%]">
                               <h3 className="font-[600] text-[14px] leading-4 hover:text-[#3872fa]">
                                  <Link to={`/product/${item?._id}`}>  {item.name}
                                  </Link>
                                 
                               </h3>
                           
                            <span className="text-[12px]">
                                {item.brand || "No Category"}
                            </span>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>{item.catName || "-"} </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>{item.subCat || "-"}</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-4 flex-col">
                       <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>&#x20b9;{item.oldPrice}</span>
                       <span className='Price text-[#3872fa] text-[14px] font-[600]'> &#x20b9;{item.price}</span>
                    </div></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <p className="text-[14px] w-[100px]"><span className="font-[600]">{item.sale} </span>rating</p>
                       
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}
                            onClick={()=>Context.setIsOpenFullScreenPanel({
                                open:true,
                                model:'Edit Product',
                                id:item?._id
                            })}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        <Link to={`/productDetail/${item?._id}`}>
                        <TooltipMUI title="view Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaEye className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                        </Link>
                    
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}
                            onClick={()=>deleteProduct(item?._id)}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>
                )
            })
           }
           
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={Context?.productData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
          
    </div>
    </>
  )
}

export default Products

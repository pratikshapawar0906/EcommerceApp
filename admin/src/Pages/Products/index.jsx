import React, { useContext, useState } from 'react'
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
import { FaRegEye, FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom';
import SearchBox from '../../Component/SearchBox';


import { MyContext } from '../../App'

const columns = [
 
  { id: 'Product', label: 'Product', minWidth: 170 },
  { id: 'Category', label: 'Category', minWidth: 80 },
  {
    id: 'Sub Category',
    label: 'Sub Category',
    minWidth: 150,
    align:"center"
  },
  {
    id: 'Brand',
    label: 'Brand',
    minWidth: 170,
    align:"center"
  },
  {
    id: 'Price',
    label: 'Price',
    minWidth: 170,
    align:"center"
  },
    {
    id: 'Sales',
    label: 'Sales',
    minWidth: 150,
    align:"center"
    
    },
     {
    id: 'Action',
    label: 'Action',
    minWidth: 150,
    align:"center"
    
    }

];

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

const Products = () => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const Context=useContext(MyContext)

    const handleChangeCatFilter = (event) => {
      setCategoryFilter(event.target.value);
    };
    

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  return (
    <>
       <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[700]">Products <span className='font-[400] text-[14px]'> ( Material UI Table)</span></h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
            <Button className='btn-blue !bg-green-500 btn-sm '>Export</Button>
            <Button className='btn-blue btn-sm !text-white' onClick={()=>Context.setIsOpenFullScreenPanel({
                open:true,
                model:'Add Product'
            })}>Add Product</Button>
        </div>
       </div>

       <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
       

        <div className="flex items-center w-full px-5 justify-between ">
            <div className="col w-[20%]">
                <h4 className="text-[12px] font-[600] mb-3">Category</h4>
                <Select
                className='w-full '
                size='small'
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={categoryFilter}
                  onChange={handleChangeCatFilter}
                  label="Category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Men">Men</MenuItem>
                  <MenuItem value="Women">Women</MenuItem>
                  <MenuItem value="Furniture">Furniture</MenuItem>
                  <MenuItem value="Jewellery">Jewellery</MenuItem>
                  <MenuItem value="Wellness">Wellness</MenuItem>
                  <MenuItem value="Kids">Kids</MenuItem>
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
                     <Checkbox {...label}  size='small'/>
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
            <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label}  size='small'/>
                     
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-4 w-[300px]">
                                           
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src='./product-1.jpg' className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                        <div className="info w-[75%]">
                               <h3 className="font-[600] text-[14px] leading-4 hover:text-[#3872fa]">
                                  <Link to='/product/4567'> Flörven
                                  </Link>
                                 
                               </h3>
                           
                            <span className="text-[12px]">
                                Books
                            </span>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>Furniture </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>sofa</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}> Baker</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-4 flex-col">
                       <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                       <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                    </div></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                        <ProgressBar value={50} type="warning"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="View  Product Details" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label}  size='small'/>
                     
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-4 w-[300px]">
                                           
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src='./product-1.jpg' className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                        <div className="info w-[75%]">
                               <h3 className="font-[600] text-[14px] leading-4 hover:text-[3872fa]">
                                  <Link to='/product/4567'> Flörven
                                  </Link>
                                 
                               </h3>
                           
                            <span className="text-[12px]">
                                Books
                            </span>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>Furniture </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>sofa</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}> Baker</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-4 flex-col">
                       <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                       <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                    </div></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                        <ProgressBar value={50} type="warning"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="View  Product Details" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label}  size='small'/>
                     
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-4 w-[300px]">
                                           
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src='./product-1.jpg' className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                        <div className="info w-[75%]">
                               <h3 className="font-[600] text-[14px] leading-4 hover:text-[3872fa]">
                                  <Link to='/product/4567'> Flörven
                                  </Link>
                                 
                               </h3>
                           
                            <span className="text-[12px]">
                                Books
                            </span>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>Furniture </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>sofa</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}> Baker</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-4 flex-col">
                       <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                       <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                    </div></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                        <ProgressBar value={50} type="warning"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="View  Product Details" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label}  size='small'/>
                     
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-4 w-[300px]">
                                           
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src='./product-1.jpg' className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                        <div className="info w-[75%]">
                               <h3 className="font-[600] text-[14px] leading-4 hover:text-[3872fa]">
                                  <Link to='/product/4567'> Flörven
                                  </Link>
                                 
                               </h3>
                           
                            <span className="text-[12px]">
                                Books
                            </span>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>Furniture </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>sofa</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}> Baker</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-4 flex-col">
                       <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                       <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                    </div></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                        <ProgressBar value={50} type="warning"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="View  Product Details" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label}  size='small'/>
                     
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-4 w-[300px]">
                                           
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src='./product-1.jpg' className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                        <div className="info w-[75%]">
                               <h3 className="font-[600] text-[14px] leading-4 hover:text-[3872fa]">
                                  <Link to='/product/4567'> Flörven
                                  </Link>
                                 
                               </h3>
                           
                            <span className="text-[12px]">
                                Books
                            </span>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>Furniture </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>sofa</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}> Baker</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-4 flex-col">
                       <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                       <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                    </div></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                        <ProgressBar value={50} type="warning"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="View  Product Details" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label}  size='small'/>
                     
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-4 w-[300px]">
                                           
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src='./product-1.jpg' className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                        <div className="info w-[75%]">
                               <h3 className="font-[600] text-[14px] leading-4 hover:text-[3872fa]">
                                  <Link to='/product/4567'> Flörven
                                  </Link>
                                 
                               </h3>
                           
                            <span className="text-[12px]">
                                Books
                            </span>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>Furniture </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>sofa</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}> Baker</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-4 flex-col">
                       <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                       <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                    </div></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                        <ProgressBar value={50} type="warning"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="View  Product Details" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label}  size='small'/>
                     
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-4 w-[300px]">
                                           
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src='./product-1.jpg' className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                        <div className="info w-[75%]">
                               <h3 className="font-[600] text-[14px] leading-4 hover:text-[3872fa]">
                                  <Link to='/product/4567'> Flörven
                                  </Link>
                                 
                               </h3>
                           
                            <span className="text-[12px]">
                                Books
                            </span>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>Furniture </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>sofa</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}> Baker</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-4 flex-col">
                       <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                       <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                    </div></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                        <ProgressBar value={50} type="warning"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="View  Product Details" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label}  size='small'/>
                     
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-4 w-[300px]">
                                           
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src='./product-1.jpg' className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                        <div className="info w-[75%]">
                               <h3 className="font-[600] text-[14px] leading-4 hover:text-[3872fa]">
                                  <Link to='/product/4567'> Flörven
                                  </Link>
                                 
                               </h3>
                           
                            <span className="text-[12px]">
                                Books
                            </span>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>Furniture </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>sofa</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}> Baker</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-4 flex-col">
                       <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                       <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                    </div></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                        <ProgressBar value={50} type="warning"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="View  Product Details" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <Checkbox {...label}  size='small'/>
                     
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-4 w-[300px]">
                                           
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src='./product-1.jpg' className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                        <div className="info w-[75%]">
                               <h3 className="font-[600] text-[14px] leading-4 hover:text-[3872fa]">
                                  <Link to='/product/4567'> Flörven
                                  </Link>
                                 
                               </h3>
                           
                            <span className="text-[12px]">
                                Books
                            </span>
                        </div>
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>Furniture </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>sofa</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}> Baker</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex  gap-4 flex-col">
                       <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                       <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                    </div></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                        <ProgressBar value={50} type="warning"/>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="View  Product Details" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px] '/>
                            </Button>
                        </TooltipMUI>
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>
          
          
           
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
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

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
import Checkbox from '@mui/material/Checkbox';
import { FiEdit3 } from 'react-icons/fi'
import { FaRegEye, FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom';
import SearchBox from '../../Component/SearchBox';
import { SlCalender } from "react-icons/sl";


import { MyContext } from '../../App'
import { MdOutlineEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'

const columns = [
 
  { id: 'userImg', label: 'USER IMAGE', minWidth: 80 },
  { id: 'userName', label: 'USER NAME', minWidth: 150 },
  {
    id: 'userEmail',
    label: 'USER EMAIL',
    minWidth: 150,
    align:"center"
  },
  {
    id: 'userPhone',
    label: 'USER PHONE NO ',
    minWidth: 170,
    align:"center"
  },
  {
    id: 'createDate',
    label: 'CREATED ',
    minWidth: 170,
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

const Users = () => {
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
      
        

    <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
       

        <div className="flex items-center w-full px-5 justify-between ">
            <div className="col w-[40%]">
                <h2 className="text-[18px] font-[700]">Users List <span className='font-[400] text-[14px]'> ( Material UI Table)</span></h2>
             
            
            </div>
            <div className="col w-[40%] ml-auto">
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
                    <div className="flex items-center gap-4 w-[70px]">
                                           
                        <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src='./product-1.jpg' className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                        
                    </div>
                </TableCell>
                <TableCell style={{minWidth:columns.minWidth}}>ABC XYZ</TableCell>
                <TableCell style={{minWidth:columns.minWidth}}><span className="flex items-center gap-2">
                    <MdOutlineEmail />abc@example.com </span></TableCell>
                <TableCell style={{minWidth:columns.minWidth}}> <span className="flex items-center gap-2">
                    <FaPhoneAlt />+91-9578479576</span></TableCell>
              
               <TableCell style={{minWidth:columns.minWidth}}>
                  <span className="flex items-center gap-2">
                    <FaPhoneAlt /><SlCalender />10-12-2025</span>
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

export default Users

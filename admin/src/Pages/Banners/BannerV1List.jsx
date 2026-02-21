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
import Checkbox from '@mui/material/Checkbox';
import { FiEdit3 } from 'react-icons/fi'
import {  FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom';
import { MyContext } from '../../App'
import { deleteData, fetchDataFromApi } from '../../utils/api'

const columns = [
 
  { id: 'image', label: 'IMAGE', minWidth: 250 },
  { id: 'action', label: 'ACTION', minWidth: 100 },
  
];

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

const BannerV1List = () => {

    const [images, setImages] = useState([]);
            const Context=useContext(MyContext)
            
    
            useEffect(()=>{
               fetchDataFromApi("/api/banner/get").then((res)=>{
                 setImages(res?.data)
               })
            },[Context?.isOpenFullScreenPanel])
        
            
            
        
            const [page, setPage] = useState(0);
            const [rowsPerPage, setRowsPerPage] = useState(10);
        
            const handleChangePage = (event, newPage) => {
              setPage(newPage);
            };
        
            const handleChangeRowsPerPage = (event) => {
              setRowsPerPage(+event.target.value);
              setPage(0);
            };
    
            const deleteBannerImage=(id)=>{
                 deleteData(`/api/banner/deleteImageSlider/${id}`).then((res)=>{
                     fetchDataFromApi("/api/banner/get").then((res)=>{
                       setImages(res?.data || []);
                     })
                 })
            }
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[700]"> Banners Sliders <span className='font-[400] text-[14px]'> </span></h2>
        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
            <Button className='btn-blue !bg-green-500 btn-sm '>Export</Button>
            <Button className='btn-blue btn-sm !text-white' onClick={()=>Context.setIsOpenFullScreenPanel({
                open:true,
                model:'Add Banner'
            })}>Add Banner Slide</Button>
        </div>
       </div>

       <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
       

        
        
    
    <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
                <TableCell className=' w-[80px]'>
                     <Checkbox {...label}  size='small'/>
                </TableCell>
              {columns.map((column) => (
                <TableCell padding="checkbox"
                 width={column.minWidth }
                  key={column.id}
                  align={column.align}
                
                >
                   
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
           </TableHead>
           <TableBody>
            {
                    images?.length !== 0 && images.map((item) =>
                         Array.isArray(item.images) &&
                       item.images.map((img, imgIndex) => (

                        <TableRow key={`${item._id}-${imgIndex}`}>
                <TableCell >
                  
                    <Checkbox {...label}  size='small'/>
                     
                </TableCell>
                <TableCell width={300}>
                    <div className="flex items-center gap-4 ">
                                           
                        <div className="img w-full rounded-md overflow-hidden group">
                            <Link to='/product/4567'>
                               <img src={img} className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>
                       
                    </div>
                </TableCell>

                <TableCell width={100}>
                    <div className="flex items-center gap-1">
                        <TooltipMUI title="Edit Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}
                            onClick={()=>Context.setIsOpenFullScreenPanel({
                                open:true,
                                model:'Edit Banner',
                                id:item?._id
                            })}>
                                 <FiEdit3 className='text-[rgba(0,0,0,0.7)] text-[20px] '/>
                            </Button>
                        </TooltipMUI>
                        
                        <TooltipMUI title="Remove Product" placement="top">
                            <Button className='!w-[35px] !h-[35px]  bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1]' style={{minWidth:'35px'}}
                             onClick={()=>deleteBannerImage(item?._id)}>
                                 <FaTrash className='text-[rgba(0,0,0,0.7)] text-[16px] '/>
                            </Button>
                        </TooltipMUI>
                    </div>
                </TableCell>
            </TableRow>
             ))
    )
                  }
            

           
          
          
           
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

export default BannerV1List

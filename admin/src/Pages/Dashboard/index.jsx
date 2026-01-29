import React, { useContext, useState } from 'react'
import DashboardBox from '../../Component/DashboardBox'
import Button from '@mui/material/Button'
import { FaAngleDown, FaAngleUp, FaPlus } from 'react-icons/fa'
import Badge from '../../Component/Badge'
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link'
import ProgressBar from '../../Component/ProgressBar'
import { FiEdit3 } from 'react-icons/fi'
import { FaRegEye, FaTrash } from 'react-icons/fa6'
import TooltipMUI from '@mui/material/Tooltip'
import Pagination from '@mui/material/Pagination'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableBody from '@mui/material/TableBody'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Linechart from '../../Component/Linechart'
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

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}




const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };
const Dashboard = () => {
  const [isOpenOrderdProduct, setIsOpenedOrderdProduct]=useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const Context=useContext(MyContext)
  
  const isShowOrderedProduct=(index)=>{
      setIsOpenedOrderdProduct(  isOpenOrderdProduct === index ? null : index)
  }

  
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
    <div className="w-full p-5 py-2 px-5 bg-[#f1faff] border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5
    justify-between rounded-md">
      <div className="info">
        <h1 className="text-[35px] font-bold leading-10 mb-3">Good Morning,
          <br/>Cameron <img src='./wave.png' className='w-[35px]'/>
        </h1>
        <p className="">Here’s What happening on your store today. See the statistics at once.</p>
        <br/>
        <Button className='btn-blue !capitalize'  onClick={()=>Context.setIsOpenFullScreenPanel({
                       open:true,
                       model:'Add Product'
                     })}><FaPlus className=''/>Add Product</Button>
      </div>
       <img src='./shop-illustration.webp' className='w-[250px]'/>
    </div>
      <DashboardBox/>

    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
       <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[18px] font-[700]">Recent Orders</h2>
       </div>
        

          <div className="relative overflow-x-auto mt-5 pb-5">
                         <table className="w-full text-sm text-left rtl:text-right text-body text-gray-500 dark:text-gary-400">
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gary-400 ">
                                 <tr>
                                     <th scope="col" className="px-6 py-3 font-medium">
                                            &nbsp;
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Order Id
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Payment Id
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Product
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Name
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Phone Number
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Address
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Pincode
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap" >
                                        Total Amount
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Email
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        user Id
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Order  Status
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                        Date
                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr className="bg-neutral-primary border-b border-default">
                                    <th  className="px-6 py-4 font-[500]">
                                     
                                         <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]'onClick={()=>isShowOrderedProduct(0)}>
                                            {
                                                isOpenOrderdProduct === 0 ?  <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> : 
                                                <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                            }
                                            </Button>
                                     </th>
                                     <th  className="px-6 py-4 font-[500]">
                                         <span className="text-[#3872fa] font-[600]">5379464hdy78bd689hf74 </span> 
                                     </th>
                                     <td className="px-6 py-4 font-[500]">
                                         <span className="text-[#3872fa] font-[600]">pay_PtubdhExThx</span>
                                     </td>
                                     <td className="px-6 py-4 font-[500]">
                                         Click here to view
                                     </td>
                                     <td className="px-6 py-4 font-[500]  whitespace-nowrap">
                                        ABC XYZ
                                     </td>
                                     <td className="px-6 py-4 font-[500]">
                                         9737927987
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                        <span className="block w-[400px]">hjjjdbdh jujfm ieiikee india</span> 
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                         493076
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                        3000
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                         abc@example.com
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                        <span className="text-[#3872fa] font-[600]"> 23163h7d747db47</span>
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                       <Badge status="pending"/>
                                     </td>
                                      <td className="px-6 py-4 font-[500]  whitespace-nowrap ">
                                         2024-12-04
                                     </td>
                                 </tr>
                                 {
                                    isOpenOrderdProduct === 0 &&  (
                                     <tr className="bg-gray-50">
                                       <td colSpan="6" className='p-0'>
                                         <div className="relative overflow-x-auto">
                                             <table className="w-full text-sm text-left rtl:text-right text-body text-gray-500 dark:text-gary-400">
                                                 <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                                                     <tr>
                                                        
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                             Product Id
                                                         </th>
                                                   
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            Product Title
                                                         </th>
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            Image
                                                         </th>
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                           Quantity
                                                         </th>
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            Price
                                                         </th>
                                                          <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            SubTotal
                                                         </th>
                                                         
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     <tr className="bg-neutral-primary border-b border-default">
                                                        <th  className="px-6 py-4 font-[500]">
                                                           <span className="text-gray-600">5379464hdy78bd689hf74 </span> 
                                                         </th>
                                                         <th  className="px-6 py-4 font-[500]">
                                                             <span className="text-gray-600">Men Alias-N Regular Fit Spread Collar Shirt</span> 
                                                         </th>
                                                         <td className="px-6 py-4 font-[500] overflow-hidden">
                                                            <img src="../Img/Shirt1.jpg" className='w-[60px] h-[60px] object-cover rounded-md '/>
                                                         </td> 
                                                         <td className="px-6 py-4 font-[500]">
                                                             2
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]  whitespace-nowrap">
                                                            1300
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]">
                                                            1300
                                                         </td>
                                                        
                                                     </tr>

                                                     <tr className="bg-neutral-primary border-b border-default">
                                                        <th  className="px-6 py-4 font-[500]">
                                                           <span className="text-gray-600">5379464hdy78bd689hf74 </span> 
                                                         </th>
                                                         <th  className="px-6 py-4 font-[500]">
                                                             <span className="text-gray-600">Men Alias-N Regular Fit Spread Collar Shirt</span> 
                                                         </th>
                                                         <td className="px-6 py-4 font-[500] overflow-hidden">
                                                            <img src="../Img/Shirt1.jpg" className='w-[60px] h-[60px] object-cover rounded-md '/>
                                                         </td> 
                                                         <td className="px-6 py-4 font-[500]">
                                                             2
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]  whitespace-nowrap">
                                                            1300
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]">
                                                            1300
                                                         </td>
                                                        
                                                     </tr>
                                                   
                                                 </tbody >
                                             </table>
                                         </div>
                                         </td>
                                     </tr>
                                 )}

                                  <tr className="bg-neutral-primary border-b border-default">
                                    <th  className="px-6 py-4 font-[500]">
                                     
                                         <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full bg-[#f1f1f1]'onClick={()=>isShowOrderedProduct(1)}>
                                            {
                                                isOpenOrderdProduct === 1 ?  <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> : 
                                                <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                            }
                                            </Button>
                                     </th>
                                     <th  className="px-6 py-4 font-[500]">
                                         <span className="text-[#3872fa] font-[600]">5379464hdy78bd689hf74 </span> 
                                     </th>
                                     <td className="px-6 py-4 font-[500]">
                                         <span className="text-[#3872fa] font-[600]">pay_PtubdhExThx</span>
                                     </td>
                                     <td className="px-6 py-4 font-[500]">
                                         Click here to view
                                     </td>
                                     <td className="px-6 py-4 font-[500]  whitespace-nowrap">
                                        ABC XYZ
                                     </td>
                                     <td className="px-6 py-4 font-[500]">
                                         9737927987
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                        <span className="block w-[400px]">hjjjdbdh jujfm ieiikee india</span> 
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                         493076
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                        3000
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                         abc@example.com
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                        <span className="text-[#3872fa] font-[600]"> 23163h7d747db47</span>
                                     </td>
                                      <td className="px-6 py-4 font-[500]">
                                       <Badge status="pending"/>
                                     </td>
                                      <td className="px-6 py-4 font-[500]  whitespace-nowrap ">
                                         2024-12-04
                                     </td>
                                 </tr>
                                 {
                                    isOpenOrderdProduct === 1 &&  (
                                     <tr className="bg-gray-50">
                                       <td colSpan="6" className='p-0'>
                                         <div className="relative overflow-x-auto">
                                             <table className="w-full text-sm text-left rtl:text-right text-body text-gray-500 dark:text-gary-400">
                                                 <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                                                     <tr>
                                                        
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                             Product Id
                                                         </th>
                                                   
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            Product Title
                                                         </th>
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            Image
                                                         </th>
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                           Quantity
                                                         </th>
                                                         <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            Price
                                                         </th>
                                                          <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                                            SubTotal
                                                         </th>
                                                         
                                                     </tr>
                                                 </thead>
                                                 <tbody>
                                                     <tr className="bg-neutral-primary border-b border-default">
                                                        <th  className="px-6 py-4 font-[500]">
                                                           <span className="text-gray-600">5379464hdy78bd689hf74 </span> 
                                                         </th>
                                                         <th  className="px-6 py-4 font-[500]">
                                                             <span className="text-gray-600">Men Alias-N Regular Fit Spread Collar Shirt</span> 
                                                         </th>
                                                         <td className="px-6 py-4 font-[500] overflow-hidden">
                                                            <img src="../Img/Shirt1.jpg" className='w-[60px] h-[60px] object-cover rounded-md '/>
                                                         </td> 
                                                         <td className="px-6 py-4 font-[500]">
                                                             2
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]  whitespace-nowrap">
                                                            1300
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]">
                                                            1300
                                                         </td>
                                                        
                                                     </tr>

                                                     <tr className="bg-neutral-primary border-b border-default">
                                                        <th  className="px-6 py-4 font-[500]">
                                                           <span className="text-gray-600">5379464hdy78bd689hf74 </span> 
                                                         </th>
                                                         <th  className="px-6 py-4 font-[500]">
                                                             <span className="text-gray-600">Men Alias-N Regular Fit Spread Collar Shirt</span> 
                                                         </th>
                                                         <td className="px-6 py-4 font-[500] overflow-hidden">
                                                            <img src="../Img/Shirt1.jpg" className='w-[60px] h-[60px] object-cover rounded-md '/>
                                                         </td> 
                                                         <td className="px-6 py-4 font-[500]">
                                                             2
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]  whitespace-nowrap">
                                                            1300
                                                         </td>
                                                         <td className="px-6 py-4 font-[500]">
                                                            1300
                                                         </td>
                                                        
                                                     </tr>
                                                   
                                                 </tbody >
                                             </table>
                                         </div>
                                         </td>
                                     </tr>
                                 )}
                                 
                              
                               
                             </tbody >
                         </table>
                     </div>

    </div>

    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
       <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[18px] font-[700]">Products <span className='font-[400] text-[14px]'> ( Tailwind Css Table)</span></h2>
       </div>

       <div className="flex items-center w-full pl-5 justify-between pr-5">
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

            <div className="col w-[25%] ml-auto flex items-center gap-3">
                <Button className='btn-blue !bg-green-500 btn-sm '>Export</Button>
                <Button className='btn-blue btn-sm' onClick={()=>Context.setIsOpenFullScreenPanel({
                       open:true,
                       model:'Add Product'
                     })}>Add Product</Button>
            </div>
        </div>
        

          <div className="relative overflow-x-auto mt-5 pb-5">
                         <table className="w-full text-sm text-left rtl:text-right text-body text-gray-500 dark:text-gary-400">
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gary-400 ">
                                 <tr>
                                     <th scope="col" className="px-6 pr-0 py-3 font-medium">
                                           <div className="w-[60px]">
                                              <Checkbox {...label}  size='small'/>
                                           </div>
                                     </th>
                                     <th scope="col" className="px-0 py-3 font-medium whitespace-nowrap">
                                         Product
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Category
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Sub Category
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Brand
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Price
                                     </th>
                                     <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Sales
                                     </th>
                                      <th scope="col" className="px-6 py-3 font-medium whitespace-nowrap">
                                         Action
                                     </th>
                                      
                                 </tr>
                             </thead>
                             <tbody>
                                  
                                  <tr className='odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default'>
                                    <th scope="rows" className="px-6 pr-0 py-2 font-medium">
                                           <div className="w-[60px]">
                                              <Checkbox {...label} size='small' />
                                           </div>
                                    </th>
                                    <td className="px-0 py-2 font-medium">
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
                                    </td>

                                    <td className="px-6 py-2 font-medium">
                                       Furniture
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                        Sofa
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                      Baker
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                         <div className="flex  gap-4 flex-col">
                                           <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                                            <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                                          </div>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                       <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                                       <ProgressBar value={50} type="warning"/>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
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
                                    </td>

                                  </tr>

                                   <tr className='odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default'>
                                    <th scope="rows" className="px-6 pr-0 py-2 font-medium">
                                           <div className="w-[60px]">
                                              <Checkbox {...label} size='small' />
                                           </div>
                                    </th>
                                    <td className="px-0 py-2 font-medium">
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
                                    </td>

                                    <td className="px-6 py-2 font-medium">
                                       Furniture
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                        Sofa
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                      Baker
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                         <div className="flex  gap-4 flex-col">
                                           <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                                            <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                                          </div>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                       <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                                       <ProgressBar value={50} type="warning"/>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
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
                                    </td>

                                  </tr>

                                   <tr className='odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default'>
                                    <th scope="rows" className="px-6 pr-0 py-2 font-medium">
                                           <div className="w-[60px]">
                                              <Checkbox {...label} size='small' />
                                           </div>
                                    </th>
                                    <td className="px-0 py-2 font-medium">
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
                                    </td>

                                    <td className="px-6 py-2 font-medium">
                                       Furniture
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                        Sofa
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                      Baker
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                         <div className="flex  gap-4 flex-col">
                                           <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                                            <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                                          </div>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                       <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                                       <ProgressBar value={50} type="warning"/>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
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
                                    </td>

                                  </tr>

                                   <tr className='odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default'>
                                    <th scope="rows" className="px-6 pr-0 py-2 font-medium">
                                           <div className="w-[60px]">
                                              <Checkbox {...label} size='small' />
                                           </div>
                                    </th>
                                    <td className="px-0 py-2 font-medium">
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
                                    </td>

                                    <td className="px-6 py-2 font-medium">
                                       Furniture
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                        Sofa
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                      Baker
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                         <div className="flex  gap-4 flex-col">
                                           <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                                            <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                                          </div>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                       <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                                       <ProgressBar value={50} type="warning"/>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
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
                                    </td>

                                  </tr>

                                   <tr className='odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default'>
                                    <th scope="rows" className="px-6 pr-0 py-2 font-medium">
                                           <div className="w-[60px]">
                                              <Checkbox {...label} size='small' />
                                           </div>
                                    </th>
                                    <td className="px-0 py-2 font-medium">
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
                                    </td>

                                    <td className="px-6 py-2 font-medium">
                                       Furniture
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                        Sofa
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                      Baker
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                         <div className="flex  gap-4 flex-col">
                                           <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                                            <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                                          </div>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                       <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                                       <ProgressBar value={50} type="warning"/>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
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
                                    </td>

                                  </tr>

                                   <tr className='odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default'>
                                    <th scope="rows" className="px-6 pr-0 py-2 font-medium">
                                           <div className="w-[60px]">
                                              <Checkbox {...label} size='small' />
                                           </div>
                                    </th>
                                    <td className="px-0 py-2 font-medium">
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
                                    </td>

                                    <td className="px-6 py-2 font-medium">
                                       Furniture
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                        Sofa
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                      Baker
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                         <div className="flex  gap-4 flex-col">
                                           <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                                            <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                                          </div>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                       <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                                       <ProgressBar value={50} type="warning"/>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
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
                                    </td>

                                  </tr>

                                   <tr className='odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default'>
                                    <th scope="rows" className="px-6 pr-0 py-2 font-medium">
                                           <div className="w-[60px]">
                                              <Checkbox {...label} size='small' />
                                           </div>
                                    </th>
                                    <td className="px-0 py-2 font-medium">
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
                                    </td>

                                    <td className="px-6 py-2 font-medium">
                                       Furniture
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                        Sofa
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                      Baker
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                         <div className="flex  gap-4 flex-col">
                                           <span className='OldPrice line-through leading text-gray-500 text-[14px] font-[500]'>$300.00</span>
                                            <span className='Price text-[#3872fa] text-[14px] font-[600]'>$250.00</span>
                                          </div>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
                                       <p className="text-[14px] w-[100px]"><span className="font-[600]">234 </span>sale</p>
                                       <ProgressBar value={50} type="warning"/>
                                    </td>
                                    <td className="px-6 py-2 font-medium">
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
                                    </td>

                                  </tr>

                                  
                              
                               
                             </tbody >
                         </table>
          </div>

          <div className="flex items-center justify-center pt-4 pb-4 px-4">
               <Pagination count={10} color="primary" />
          </div>
    </div>

     <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
         <h2 className="text-[18px] font-[700]">Products <span className='font-[400] text-[14px]'> ( Material UI Table)</span></h2>
        </div>

        <div className="flex items-center w-full pl-5 justify-between pr-5">
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

            <div className="col w-[25%] ml-auto flex items-center gap-3">
                <Button className='btn-blue !bg-green-500 btn-sm '>Export</Button>
                <Button className='btn-blue btn-sm'  onClick={()=>Context.setIsOpenFullScreenPanel({
                       open:true,
                       model:'Add Product'
                     })}>Add Product</Button>
            </div>
        </div>
        <br/>  
        
    
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow>
                    <TableCell className='!bg-[#f1f1f1]'>
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

    <Linechart/>
  
    </>
  )
}

export default Dashboard

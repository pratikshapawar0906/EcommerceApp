import Button from '@mui/material/Button'
import React from 'react'
import { FaRegMinusSquare, FaRegPlusSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CategoryCollapse = (props) => {
  const [subMenuIndex, setSubMenuIndex] = React.useState(null);
 const [innerSubMenuIndex, setInnerSubMenuIndex] = React.useState(null);

 

  const openSubMenu=(index)=>{
    setSubMenuIndex(prev => (prev === index ? null : index));
  }

  const openInnerSubMenu=(index)=>{
    setInnerSubMenuIndex(prev => (prev === index ? null : index));
  }
  return (
    <>
        <div className="scroll">
        <ul className='w-full'>
          {
            props?.data?.length !== 0 &&  props?.data?.map((item,index)=>{
              return(
                <li className='list-none flex items-center relative flex-col' key={index}>
                  <Link to='/' className='w-full '>
                  <Button className='w-full !text-left !justify-start !px-3 !text-rgba(0,0,0,0.8)'>
                    {item?.name}
                  </Button>
                  </Link>
                  {
                     subMenuIndex  === index ? (
                       <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                        onClick={()=>openSubMenu(index)}/>
                     ):(
      
                       <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                        onClick={()=>openSubMenu(index)}/>
                     )
                  }
                  
                  {
                    subMenuIndex===index && (
                    <ul className='submenu  w-full !pl-3  '>
                    {
                      item?.children?.length  > 0 && item?.children?.map((subcat,index_)=>{
                        return(
                                <li className='list-none relative' key={index_}>
                                  <Link to='/'  className='w-full'>
                                   <Button className='w-full !text-left !justify-start !px-3 !text-rgba(0,0,0,0.8)'>
                                    {subcat?.name}</Button>
                                  </Link>
                                  {
                                     innerSubMenuIndex  === index_ ?(
                                       <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                                        onClick={()=>openInnerSubMenu(index_)}/>
                                     ):(
                      
                                       <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                                        onClick={()=>openInnerSubMenu(index_)}/>
                                     )
                                  }
                                   
                                   {
                                     innerSubMenuIndex ===0  && (
                                      <ul className='innersubmenu  w-full !pl-3 '>
                                         {
                                           subcat?.children?.length  > 0 && subcat?.children?.map((ThridSub,index__)=>{
                                             return(
                                               <li className='list-none relative mb-1' key={index__}>
                                                  <Link to='/' className='link w-full !text-left !justify-start !px-3
                                                  transition text-[14px]'>
                                                   {ThridSub?.name}</Link>
                                               </li>
                                             )
                                           })
                                         }
                                       
                                      </ul>
                                    )
                                    }
                  
                                </li>
                              )
                       })
                    }
                   
                  </ul>
                  )}
      
                  
                </li>
            )})
          }          
         

         
           
        </ul>
      </div>
    </>
  )
}

export default CategoryCollapse

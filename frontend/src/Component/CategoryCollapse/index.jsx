import Button from '@mui/material/Button'
import React from 'react'
import { FaRegMinusSquare, FaRegPlusSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CategoryCollapse = () => {
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
          {/* Fashion */}
          <li className='list-none flex items-center relative flex-col'>
            <Link to='/' className='w-full'>
            <Button className='w-full !text-left !justify-start !px-3 !text-rgba(0,0,0,0.8)'>Fashion</Button>
            </Link>
            {
               subMenuIndex  === 0 ?(
                 <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                  onClick={()=>openSubMenu(0)}/>
               ):(

                 <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                  onClick={()=>openSubMenu(0)}/>
               )
            }
            
            {
              subMenuIndex===0 && (
              <ul className='submenu  w-full !pl-3  '>
              <li className='list-none relative'>
                <Link to='/'  className='w-full'>
                 <Button className='w-full !text-left !justify-start !px-3 !text-rgba(0,0,0,0.8)'>
                  Apparel</Button>
                </Link>
                {
                   innerSubMenuIndex  === 0 ?(
                     <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                      onClick={()=>openInnerSubMenu(0)}/>
                   ):(
    
                     <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                      onClick={()=>openInnerSubMenu(0)}/>
                   )
                }
                 
                 {
                   innerSubMenuIndex ===0  && (
                    <ul className='innersubmenu  w-full !pl-3 '>
                      <li className='list-none relative mb-1'>
                         <Link to='/' className='link w-full !text-left !justify-start !px-3
                         transition text-[14px]'>
                          Smart Tablet</Link>
                      </li>
                      <li className='list-none relative mb-1'>
                         <Link to='/' className='link w-full !text-left !justify-start !px-3
                         transition text-[14px]'>
                          Crepe T-shirt</Link>
                      </li>
                      <li className='list-none relative mb-1'>
                         <Link to='/' className='link w-full !text-left !justify-start !px-3
                         transition text-[14px]'>
                          Leather watch</Link>
                      </li>
                      <li className='list-none relative mb-1'>
                         <Link to='/' className='link w-full !text-left !justify-start !px-3
                         transition text-[14px]'>
                          Rolling Diamond</Link>
                      </li>
                    </ul>
                  )
                  }

            
              </li>
              </ul>
            )}

            
          </li>

          {/*  */}
           <li className='list-none flex items-center relative flex-col'>
            <Link to='/' className='w-full'>
            <Button className='w-full !text-left !justify-start !px-3 !text-rgba(0,0,0,0.8)'>Fashion</Button>
            </Link>
            {
               subMenuIndex  === 1 ?(
                 <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                  onClick={()=>openSubMenu(1)}/>
               ):(

                 <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                  onClick={()=>openSubMenu(1)}/>
               )
            }
            
            {
              subMenuIndex===1 && (
              <ul className='submenu  w-full !pl-3  '>
              <li className='list-none relative'>
                <Link to='/'  className='w-full'>
                 <Button className='w-full !text-left !justify-start !px-3 !text-rgba(0,0,0,0.8)'>
                  Apparel</Button>
                </Link>
                {
                   innerSubMenuIndex  === 1 ?(
                     <FaRegMinusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                      onClick={()=>openInnerSubMenu(1)}/>
                   ):(
    
                     <FaRegPlusSquare className='absolute top-[10px] right-[15px] cursor-pointer '
                      onClick={()=>openInnerSubMenu(1)}/>
                   )
                }
                 
                 {
                   innerSubMenuIndex ===1  && (
                    <ul className='innersubmenu  w-full !pl-3 '>
                      <li className='list-none relative mb-1'>
                         <Link to='/' className='link w-full !text-left !justify-start !px-3
                         transition text-[14px]'>
                          Smart Tablet</Link>
                      </li>
                      <li className='list-none relative mb-1'>
                         <Link to='/' className='link w-full !text-left !justify-start !px-3
                         transition text-[14px]'>
                          Crepe T-shirt</Link>
                      </li>
                      <li className='list-none relative mb-1'>
                         <Link to='/' className='link w-full !text-left !justify-start !px-3
                         transition text-[14px]'>
                          Leather watch</Link>
                      </li>
                      <li className='list-none relative mb-1'>
                         <Link to='/' className='link w-full !text-left !justify-start !px-3
                         transition text-[14px]'>
                          Rolling Diamond</Link>
                      </li>
                    </ul>
                  )
                  }

            
              </li>
              </ul>
            )}

            
          </li>
        </ul>
      </div>
    </>
  )
}

export default CategoryCollapse

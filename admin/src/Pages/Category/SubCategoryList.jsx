import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import { MyContext } from '../../App'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import EditSubCatBox from './EditSubCatBox';

const SubCategoryList = () => {
    const [isOpen, setIsOpen] = useState(0);
    const Context=useContext(MyContext)

    const expand=(index)=>{
      if(isOpen===index){
        setIsOpen(!isOpen);
      }else{
        setIsOpen(index);
      }
    }

        
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[700]">Sub Category List</h2>
        <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
            <Button className='btn-blue btn-sm !text-white' onClick={()=>Context.setIsOpenFullScreenPanel({
                open:true,
                model:'Add New Subcategory'
            })}>Add New Subcategory</Button>
        </div>
      </div>

    <div className="card my-4 p-5 shadow-md rounded-lg bg-white">
        {Context?.catData?.length > 0 && (
          <ul className="w-full">
            {Context.catData.map((firstLevelCat, index) => (
              <li key={firstLevelCat._id} className="mb-1">
                <div className="flex items-center p-2 bg-[#f1f1f1] rounded px-4">
                  <span className="font-[500] text-[14px]">
                    {firstLevelCat.name}
                  </span>

                  <Button
                    className="!min-w-[35px] !w-[35px] !h-[35px] !ml-auto"
                    onClick={() => expand(index)}
                  >
                    {isOpen === index ? <FaAngleUp /> : <FaAngleDown />}
                  </Button>
                </div>

                {isOpen === index &&
                  firstLevelCat?.children?.length > 0 && (
                    <ul className="w-full">
                      {firstLevelCat.children.map((subCat) => (
                        <li key={subCat._id} className="py-1">
                          <EditSubCatBox
                            name={subCat.name}
                            id={subCat._id}
                            catData={Context.catData}
                            selectedCat={subCat.parentId}
                            selectedCatName={subCat.parentCatName}
                          />

                          {subCat.children?.length > 0 && (
                            <ul className="pl-4">
                              {subCat.children.map((thirdLevel) => (
                                <li
                                  key={thirdLevel._id}
                                  className="hover:bg-[#f1f1f1]"
                                >
                                  <EditSubCatBox
                                    name={thirdLevel.name}
                                    id={thirdLevel._id}
                                    selectedCat={thirdLevel.parentId}
                                    selectedCatName={thirdLevel.parentCatName}
                                  />
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default SubCategoryList

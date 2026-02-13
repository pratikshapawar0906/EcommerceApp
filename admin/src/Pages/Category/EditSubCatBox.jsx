import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const EditSubCatBox = (props) => {
    const Context=useContext(MyContext)

    const[isLoading,setIsLoading]=useState(false);
    const[editMode,setEditMode]=useState(false);
    const[selectVal,setSelecatVal]=useState("");

        
    const[formField,setfromField]=useState({
          name:"", 
          parentCatName:null,  
          parentId:null
    }) 

    useEffect(()=>{
      setfromField({
        name: props.name || '',
        parentCatName: props.selectedCatName || null,
        parentId: props.selectedCat || ''
      });
      setSelecatVal(props.selectedCat ?? "");
    },[props])

    const onChangeInput=(e)=>{
     const {name, value}=e.target
     const catId=selectVal
     setSelecatVal(catId)
      setfromField(()=>{
        return{
         ...formField,
         [name]: value
        }
      })
    }

    const handleChange=(event)=>{
        setSelecatVal(event.target.value);
        formField.parentId=event.target.value;
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
    
      setIsLoading(true);
        if(formField.name === "" ){
           Context.alertBox("error", "Please enter Category  name ");
            return false
        }
        
        editData(`/api/category/updatecategory/${props?.id}`,formField).then((res)=>{
          if(res?.success){
             Context.alertBox("success",  res?.message || "Created Sub category  successful!" );
             
              setIsLoading(false)
              Context?.getCat();
            
          } else {
             Context.alertBox("error", res?.message || "Something went wrong!" );
              setIsLoading(false)
          }
        })
    }

    const deleteCat=(id)=>{
      deleteData(`/api/category/deleteCategory/${id}`).then((res)=>{
        Context?.getCat()
      })
    }

  return (
    <>
    <form action="" className="w-full flex items-center gap-3 p-0 px-4" onSubmit={handleSubmit}>
        {
             editMode ===true &&
             <>
                <div className="flex items-center justify-between  w-full py-2 gap-4">
                    <div className="w-[260px]">
                        <Select
                         style={{zoom:'75%'}}
                          labelId="demo-simple-select-label"
                          id="productCatDrop"
                          size='small'
                          className='!w-full'
                          value={selectVal}
                          label="Category"
                          onChange={handleChange}
                          inputProps={{ 'aria-label':'Without label'}}
                        >
                            {
                                props?.catData?.length !==0 && props?.catData?.map((item,index)=>{
                                    return(
                                        <MenuItem value={item?._id} key={index} onClick={()=>{
                                            formField.parentCatName=item?.name
                                        }}>{item?.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <input type="text" className='w-full h-[30px] border border-[rgab(0,0,0,0.2)]
                    focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                    name='name' value={formField?.name} onChange={onChangeInput}/>
                     <div className="flex items-center  gap-2">
                        <Button className='btn-sml' size="small" type="submit" variant='Contained' sx={{ minWidth: 80 }}>
                            {
                                isLoading === true ?<CircularProgress color='inherit'/>
                                :
                                <>
                                Edit
                                </>
                            }
                        </Button>
                        <Button  size="small"  variant='outlined' onClick={()=>setEditMode(false)} sx={{ minWidth: 80 }}>Cancel</Button>
                     </div>
                </div>
            </>
        }
        {
             editMode ===false &&
             <>
             <span className="font-[500] text-[14px]">{props?.name}</span>
             <div className="flex items-center !ml-auto gap-2 ">
                <Button className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black '
                 onClick={()=> {setEditMode(true);
                setSelecatVal(props.selectdCat ?? "")}}
                ><MdOutlineModeEdit/></Button>
                <Button className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black '
                 onClick={()=>deleteCat(props?.id)}>
                    <FaRegTrashAlt/>
                </Button>
             </div>
             </>
        }

    </form>
      
    </>
  )
}

export default EditSubCatBox

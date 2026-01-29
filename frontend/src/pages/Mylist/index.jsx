import React from 'react'
import MyListItem from './MyListItems'
import AccountSidebar from '../../Component/AccountSidebar'

const MyList = () => {
  return (
    <>

     <section className="py-10 w-full">
        <div className="container  flex  gap-5">
            <div className="col1 w-[20%]">
              <AccountSidebar/>
            </div>

            <div className="col2 w-[70%]">
                <div className="shadow-md rounded-md  bg-white">
                  <div className="py-3 px-3 boder-b-1 border-[rgba(0,0,0,0.1)]">
                    <h2 className="font-[600]">My List</h2>
                    <p className="mt-0">There are <span className="font-bold text-[#ff5252]">2</span>{" "}product in your List</p>
                  </div>
                
                  <MyListItem />
                  <MyListItem />
                  <MyListItem />
                  <MyListItem />
               </div>
            </div>
        </div>
      </section>

     
    </>
  )
}

export default MyList

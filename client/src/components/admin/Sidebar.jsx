import { CircleUser, Settings } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';


const MeneItems = () => {

  return (
    <nav className='mt-8 flex-col flex gap-2 '>

    </nav>
  )
}



const AdminSidebar = () => {

  const navigate = useNavigate();


  return (
    <>
      <aside className="hidden flex-col  w-64 border-r bg-background p-6 lg:flex  ">
        <div onClick={()=>navigate("/admin/dashboard")} className="flex items-center gap-2 cursor-pointer">
          <Settings />
          <h1 className='text-lg font-semibold '>Admin Panel</h1>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar

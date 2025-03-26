import React from 'react'
import Sidebar from '../Sidebar/SideBar'
import Navbar from "../Navbar/NaBbar";
import { Outlet } from 'react-router-dom'

const MasterLayout = ({loginData}) => {
  return (
    <div className="d-flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-100 ">
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}

export default MasterLayout

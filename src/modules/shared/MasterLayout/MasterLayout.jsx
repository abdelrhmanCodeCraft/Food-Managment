import React from 'react'
import Sidebar from '../Sidebar/SideBar'
import Navbar from "../Navbar/Navbar";
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'

const MasterLayout = () => {
  return (
    <div className="d-flex">
      <div className="w-25 bg-info">
        <Sidebar />
      </div>
      <div className="w-75 bg-warning">
        <Navbar />
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default MasterLayout

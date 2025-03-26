import React, { useState } from "react";
import logo from '../../../assets/images/3.png'
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaUtensils, FaList, FaSignOutAlt } from "react-icons/fa";

const SideBar = () => {

  const navigate = useNavigate()

  const [isCollapse, setIsCollapse] = useState(false);
  const toggleCollapse = ()=>{
    setIsCollapse(!isCollapse)
  }

  const logout = () =>{
    localStorage.removeItem('token')
    navigate('/')
    console.log('you are logged out')
  }

  return (
    <div className="sidebar-contaier">
      <Sidebar collapsed={isCollapse}>
        <Menu>
          <MenuItem
            onClick={toggleCollapse}
            className="m-2 logo-li"
            style={{marginBottom:"5rem"}}
            icon={
              <img
                className="sidebar-logo pt-3"
                style={{ width: "9rem"}}
                src={logo}
              />
            }
          ></MenuItem>
          <MenuItem component={<Link to="/dashboard" />} icon={<FaHome />}>
            Home
          </MenuItem>
          <MenuItem
            component={<Link to="/dashboard/user-list" />}
            icon={<FaUsers />}
          >
            Users
          </MenuItem>
          <MenuItem
            component={<Link to="/dashboard/recipe-list" />}
            icon={<FaUtensils />}
          >
            Recipe
          </MenuItem>
          <MenuItem
            component={<Link to="/dashboard/categories-list" />}
            icon={<FaList />}
          >
            Categories
          </MenuItem>
          <MenuItem onClick={logout} icon={<FaSignOutAlt />}>
            Log out
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { ChevronLeft, ChevronRight } from 'react-feather'; // Import chevron icons
import "./Navigation.css";

function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
        <ul className="nav-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="menu">
            <span>Organization</span>
            <ul className="submenu">
              <li><NavLink to="/all">Sites</NavLink></li>
              <li><NavLink to="/racks">Racks</NavLink></li>
              <li><NavLink to="/contracts">Contracts</NavLink></li>
              <li><NavLink to="/elevations">Elevations</NavLink></li>
            </ul>
          </li>
          <li className="menu">
            <span>Devices</span>
            <ul className="submenu">
              <li><NavLink to="/devices">All Devices</NavLink></li>
              <li><NavLink to="/device-roles">Device Roles</NavLink></li>
            </ul>
          </li>
          <li className="menu">
            <span>Reports/Tools</span>
            <ul className="submenu">
              <li><NavLink to="/new-bom">New BOM</NavLink></li>
              <li><NavLink to="/power-utilization">Power Utilization</NavLink></li>
              <li><NavLink to="/spine-balance">Spine Balance</NavLink></li>
            </ul>
          </li>
          <li>
            <ProfileButton />
          </li>
        </ul>
      </div>
      {/* The button to open/close the sidebar */}
      <button className={`chevron-button ${isSidebarOpen ? 'chevron-open' : 'chevron-closed'}`} onClick={toggleSidebar}>
        {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
    </>
  );
}

export default Navigation;

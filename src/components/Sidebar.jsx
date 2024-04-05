import React from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";
import { useUserRole } from "../contexts/UserRoleContext";

const Sidebar = ({ sidebarCollapsed }) => {
  const { userRole } = useUserRole();

  return (
    <aside
      id="sidebar"
      className={`js-sidebar  ${sidebarCollapsed ? "collapsed" : ""}`}
    >
      <div className="sidebarContainer">
        <div className="sidebar-logo d-flex align-items-center">
          <i className="bx bxs-droplet p-1 me-2 fs-4 rounded-circle border border-primary"></i>
          <Link to="/home">WaterMS</Link>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Main</li>
          <li className="sidebar-item">
            <Link to="/home" className="sidebar-link">
              <i className="bx bx-category pe-2 align-middle"></i>
              <span className="align-middle">Dashboard</span>
            </Link>
          </li>
          {userRole === "admin" && (
            <li className="sidebar-item">
              <Link to="/users" className="sidebar-link">
                <i className="bx bx-group pe-2 align-middle"></i>
                <span className="align-middle">Users</span>
              </Link>
            </li>
          )}
          <li className="sidebar-item">
            <a
              href="#"
              className="sidebar-link collapsed"
              data-bs-target="#buildings"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              <i className="bx bx-buildings pe-2 align-middle"></i>
              <span className="align-middle">Building</span>
            </a>
            <ul
              id="buildings"
              className="sidebar-dropdown list-unstyled collapse ps-4"
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item">
                <Link to="/building/ccs" className="sidebar-link">
                  CCS
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/building/dorm" className="sidebar-link">
                  Dormitory
                </Link>
              </li>
            </ul>
          </li>
          <li className="sidebar-item">
            <a
              href="#"
              className="sidebar-link collapsed"
              data-bs-target="#analytics"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              <i className="bx bx-bar-chart-alt-2 pe-2 align-middle"></i>
              <span className="align-middle">Analytics</span>
            </a>
            <ul
              id="analytics"
              className="sidebar-dropdown list-unstyled collapse ps-4"
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item">
                <Link to="/analytics/weekly" className="sidebar-link">
                  Weekly
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/anlytics/monthly" className="sidebar-link">
                  Monthly
                </Link>
              </li>
            </ul>
          </li>
          <li className="sidebar-item">
            <Link to="/billing" className="sidebar-link">
              <i className="bx bx-receipt pe-2 align-middle"></i>
              <span className="align-middle">Billing Management</span>
            </Link>
          </li>
          <li className="sidebar-header">Misc</li>
          <li className="sidebar-item">
            <Link to="/profile" className="sidebar-link">
              <i className="bx bx-user pe-2 align-middle"></i>
              <span className="align-middle">User Profile</span>
            </Link>
            <Link to="/account-settings" className="sidebar-link">
              <i className="bx bx-cog pe-2 align-middle"></i>
              <span className="align-middle">Account Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

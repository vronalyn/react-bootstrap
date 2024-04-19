import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../css/Sidebar.css";
import { useUserRole } from "../contexts/UserRoleContext";

const Sidebar = ({ sidebarCollapsed, id }) => {
  const { userRole } = useUserRole();
  const location = useLocation();
  const isBuildingPage = location.pathname.includes("/building/");
  const isAnalyticsPage = location.pathname.includes("/analytics/");

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
            <NavLink
              to="/home"
              className="sidebar-link"
              activeClassName="active"
            >
              {" "}
              {/* Use NavLink */}
              <i className="bx bx-category pe-2 align-middle"></i>
              <span className="align-middle">Dashboard</span>
            </NavLink>
          </li>
          {userRole === "Admin" && (
            <li className="sidebar-item">
              <NavLink to="/users" className="sidebar-link">
                <i className="bx bx-group pe-2 align-middle"></i>
                <span className="align-middle">Users</span>
              </NavLink>
            </li>
          )}
          <li className="sidebar-item" id="step-five">
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
              className={`sidebar-dropdown list-unstyled collapse ps-4 ${
                isBuildingPage ? "show" : ""
              }`}
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item">
                <NavLink to="/building/ccs" className="sidebar-link">
                  CCS
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/building/dorm" className="sidebar-link">
                  Dormitory
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="sidebar-item" id="step-six">
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
              className={`sidebar-dropdown list-unstyled collapse ps-4 ${
                isAnalyticsPage ? "show" : ""
              }`}
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item">
                <NavLink to="/analytics/weekly" className="sidebar-link">
                  Weekly
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink to="/analytics/monthly" className="sidebar-link">
                  Monthly
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="sidebar-item " id="step-seven">
            <NavLink
              to="/billing"
              className="sidebar-link"
              // activeClassName="active"
            >
              <i className="bx bx-receipt pe-2 align-middle"></i>
              <span className="align-middle">Billing Management</span>
            </NavLink>
          </li>
          <li className="sidebar-header">Misc</li>
          <li className="sidebar-item">
            <NavLink to="/profile" className="sidebar-link">
              <i className="bx bx-user pe-2 align-middle"></i>
              <span className="align-middle">User Profile</span>
            </NavLink>
            <NavLink to="/account-settings" className="sidebar-link">
              <i className="bx bx-cog pe-2 align-middle"></i>
              <span className="align-middle">Account Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

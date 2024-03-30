import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Sidebar.css'

const Sidebar = ({ sidebarCollapsed }) => {
    return (
        <aside id="sidebar"  className={`js-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="h-100">
                <div className="sidebar-logo d-flex align-items-center">
                    <i className='bx bxs-droplet p-1 me-2 fs-4 rounded-circle border border-primary' ></i>
                    <Link to={'/'}>WaterMS</Link>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        Main
                    </li>
                    
                    <li class="sidebar-item">
						<a class="sidebar-link" href="#">
                        <i className='bx bx-category pe-2 align-middle' ></i> 
                        <span class="align-middle">Dashboard</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href='#' className="sidebar-link">
                            <i className='bx bx-group pe-2 align-middle' ></i>
                            <span className='align-middle'>Users</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link collapsed" data-bs-target="#buildings" data-bs-toggle="collapse"
                            aria-expanded="false"><i className='bx bx-buildings pe-2 align-middle' ></i>
                            <span className='align-middle'>Building</span>
                        </a>
                        <ul id="buildings" className="sidebar-dropdown list-unstyled collapse ps-4" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">CCS</a>
                            </li>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Dormitory</a>
                            </li>
                        </ul>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link collapsed" data-bs-target="#analytics" data-bs-toggle="collapse"
                            aria-expanded="false"><i className='bx bx-bar-chart-alt-2 pe-2 align-middle' ></i>
                            <span className='align-middle'>Analytics</span>
                        </a>
                        <ul id="analytics" className="sidebar-dropdown list-unstyled collapse ps-4" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Weekly</a>
                            </li>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Monthly</a>
                            </li>
                        </ul>
                    </li>
                    <li className="sidebar-item">
                        <a href='#' className="sidebar-link">
                            <i className='bx bx-receipt pe-2 align-middle' ></i>
                            <span className='align-middle'>Building Management</span>
                        </a>
                    </li>

                    <li className="sidebar-header">
                        Misc
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <i className='bx bx-user pe-2 align-middle' ></i>
                            <span className='align-middle'>User Profile</span>
                        </a>
                        <a href="#" className="sidebar-link ">
                            <i className='bx bx-cog pe-2 align-middle' ></i>
                            <span className='align-middle'>Account Settings</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>


    )
}

export default Sidebar
import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Sidebar.css'

const Sidebar = () => {
    return (
        <aside id="sidebar" className="js-sidebar collapse-horizontal">
            <div className="h-100">
                <div className="sidebar-logo">
                    <i className='bx bxs-droplet text-primary pe-2 fs-4' ></i>
                    <Link to={'/'} className='a'>WaterMS</Link>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        Main
                    </li>
                    <li className="sidebar-item">
                        <Link to={'/home'} className="sidebar-link">
                            <i className='bx bx-category pe-2' ></i>
                            Dashboard
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <a href='#' className="sidebar-link">
                            <i className='bx bx-group pe-2' ></i>
                            Users
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link collapsed" data-bs-target="#buildings" data-bs-toggle="collapse"
                            aria-expanded="false"><i className='bx bx-buildings pe-2' ></i>
                            Buildings
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
                            aria-expanded="false"><i className='bx bx-bar-chart-alt-2 pe-2' ></i>
                            Analytics
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
                            <i className='bx bx-receipt pe-2' ></i>
                            Billing Management
                        </a>
                    </li>

                    <li className="sidebar-header">
                        Misc
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <i className='bx bx-user pe-2' ></i>
                            User Profile
                        </a>
                        <a href="#" className="sidebar-link ">
                            <i className='bx bx-cog pe-2' ></i>
                            Account Settings
                        </a>
                    </li>
                </ul>
            </div>
        </aside>


    )
}

export default Sidebar
import React from 'react'

const Navbar2 = ({ toggleSidebar }) => {

    return (
        <nav className="navbar navbar-expand px-3 py-0 border-bottom bg-white">
            <button className="btn bg-transparent" id="sidebar-toggle" type="button" onClick={toggleSidebar}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse navbar ">
                <ul className="navbar-nav navbar-align">
                    <div class="dropdown me-2">
                        <button class="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class='bx bx-bell align-middle fs-5' ></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <div class="dropdown-menu-header align-middle text-center text-muted">
                                4 New Notifications
                            </div>
                            <li><hr class="dropdown-divider" /></li>
                            <li className="d-flex align-items-center mt-3 pe-2">
                                <a class="dropdown-item lh-1 d-flex " href="#">
                                    <span className="me-3 justify-content-center">
                                        <i className="bx bxs-error-circle rounded-circle bg-warning-subtle text-warning p-2 align-items-center"></i>
                                    </span>
                                    <div>
                                        <p className="p-0 fs-6 mb-0">Max Usage Reached</p><br />
                                        <p className="fs-7 mb-0 badge text-secondary p-0">30/03/24 3:00 pm</p>
                                    </div>
                                </a>
                            </li>
                            <li className="d-flex align-items-center mt-3 pe-2">
                                <a class="dropdown-item lh-1 d-flex " href="#">
                                    <span className="me-3">
                                        <i className="bx bxs-error-circle rounded-circle bg-danger-subtle text-danger p-2 align-items-center justify-content-center"></i>
                                    </span>
                                    <div>
                                        <p className="p-0 fs-6 mb-0">Max Usage Reached</p><br />
                                        <p className="fs-7 mb-0 badge text-secondary p-0">30/03/24 5:00 pm</p>
                                    </div>
                                </a>
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <div class="dropdown-menu-footer text-center">
                                <a href="#" class="text-muted fs-7">Show all notifications</a>
                            </div>
                        </ul>
                    </div>
                    <li className="nav-item dropdown">
                        <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0 dropdown-toggle text-black">
                            <span className='pe-2 '>Admin</span>
                            <img src='/images/profile.jpg' className="avatar img-fluid rounded-circle" alt="" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a href="/" className="dropdown-item">
                                <i className='bx bx-user-circle'></i> Profile</a>
                            <a href="/" className="dropdown-item">
                                <i className='bx bx-cog'></i> Settings</a>
                            <a href="/" className="dropdown-item">
                                <i className='bx bx-log-out'></i> Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar2
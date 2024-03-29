import React from 'react'

const Navbar2 = () => {

    return (
        <nav className="navbar navbar-expand px-3 py-0 border-bottom bg-white">
            <button className="btn" id="sidebar-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse navbar ">
                <ul className="navbar-nav">
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
// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="navbar sticky-top z-1 bg-dark">
//       <div className="container d-flex justify-content-between align-items-center">
//         <Link to="/" className="navbar-brand text-white fw-bold">
//         <box-icon name='droplet' type='solid' color='#00a3ff' ></box-icon>
//           WaterMS
//         </Link>
//         <div className="d-flex text-uppercase fw-light">
//           <a href="#about" className="nav-link text-white me-5 px-3">About</a>
//           <a href="#contact" className="nav-link text-white me-5 px-3">Contact</a>
//           <Link to="/login" className="nav-link text-white px-3">Login</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top z-1">
      <div className="container">
        <Link to="/" className="navbar-brand text-white fw-bold">
        <i className='bx bxs-droplet text-primary'></i>
          <span className="mx-2">WaterMS</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="#about" className="nav-link text-white px-3">About</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link text-white px-3">Contact</a>
            </li>
            <li className="nav-item">
              <Link to="/login" className="btn btn-light text-white px-3">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


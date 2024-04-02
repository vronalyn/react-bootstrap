import React, { useState, useEffect } from "react";
import { doGetUserAccount, doSignOut } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar2 = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const userData = await doGetUserAccount(currentUser.uid);
          // const userDataFromFirestore = docSnapshot.data(); // Retrieve data from Firestore document
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching user account data:", error);
        }
      };
      fetchUserData();
    }
  }, [currentUser]);

  return (
    <nav className="navbar navbar-expand px-3 py-0 border-bottom bg-white ">
      <button
        className="btn bg-transparent "
        id="sidebar-toggle"
        type="button"
        onClick={toggleSidebar}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-collapse navbar ">
        <ul className="navbar-nav navbar-align">
          <div className="dropdown me-2">
            <button
              className="btn border-0"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bx bx-bell align-middle fs-5"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <div className="dropdown-menu-header align-middle text-center text-muted">
                4 New Notifications
              </div>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="d-flex align-items-center mt-3 pe-2">
                <a className="dropdown-item lh-1 d-flex " href="#">
                  <span className="me-3 justify-content-center">
                    <i className="bx bxs-error-circle rounded-circle bg-warning-subtle text-warning p-2 align-items-center"></i>
                  </span>
                  <div>
                    <p className="p-0 fs-6 mb-0">Max Usage Reached</p>
                    <br />
                    <p className="fs-7 mb-0 badge text-secondary p-0">
                      30/03/24 3:00 pm
                    </p>
                  </div>
                </a>
              </li>
              <li className="d-flex align-items-center mt-3 pe-2">
                <a className="dropdown-item lh-1 d-flex " href="#">
                  <span className="me-3">
                    <i className="bx bxs-error-circle rounded-circle bg-danger-subtle text-danger p-2 align-items-center justify-content-center"></i>
                  </span>
                  <div>
                    <p className="p-0 fs-6 mb-0">Max Usage Reached</p>
                    <br />
                    <p className="fs-7 mb-0 badge text-secondary p-0">
                      30/03/24 5:00 pm
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <div className="dropdown-menu-footer text-center">
                <a href="#" className="text-muted fs-7">
                  Show all notifications
                </a>
              </div>
            </ul>
          </div>
          <li className="nav-item dropdown">
            <a
              href="#"
              data-bs-toggle="dropdown"
              className="nav-icon pe-md-0 dropdown-toggle text-black d-flex align-items-center "
            >
              <span className="pe-2 text-capitalize ">
                {userData ? userData.firstname : <span>.</span>}
              </span>
              {/* <img
                src="/images/profile.jpg"
                className="avatar img-fluid rounded-circle"
                alt=""
              /> */}
              {userData ? (
                userData.profileImage ? ( // Check if profileImage exists
                  <img
                    src="/images/profile1.jpg"
                    className="avatar img-fluid rounded-circle"
                    alt=""
                  />
                ) : (
                  <div className="avatar rounded-circle bg-info-subtle p-1 d-flex align-items-center justify-content-center ">
                    <span className="text-center fw-bold text-uppercase ">
                      {userData.firstname && userData.firstname.charAt(0)}
                      {userData.lastname && userData.lastname.charAt(0)}
                    </span>
                  </div>
                )
              ) : (
                <span>.</span>
              )}
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <a href="/profile" className="dropdown-item">
                <i className="bx bx-user-circle"></i> Profile
              </a>
              <a href="/account-settings" className="dropdown-item">
                <i className="bx bx-cog"></i> Settings
              </a>
              <a
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/");
                  });
                }}
                href="/"
                className="dropdown-item"
              >
                <i className="bx bx-log-out"></i> Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar2;

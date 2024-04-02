import React, { useState, useEffect } from "react";
import "./setting.css";
import Sidebar from "../../components/Sidebar";
import Navbar2 from "../../components/Navbar2";

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doPasswordChange } from "../../firebase/auth";

function AccountSettings() {
  const { currentUser } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      await doPasswordChange(newPassword);

      // Reset form fields and error message
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setError("");
    } catch (error) {
      // Handle reauthentication error
      setError("Invalid update password. Please try again.");
      console.error("Reauthentication error:", error);
    }

    // try {
    //   // Reauthenticate the user with their current password
    //   await doReauthenticateUser(currentUser.email, currentPassword);

    //   // If reauthentication is successful, proceed to change password
    //   // Implement your password change logic here
    //   console.log("Password reauthentication successful");
    //   console.log("New password:", newPassword);

    //   // Reset form fields and error message
    //   setCurrentPassword("");
    //   setNewPassword("");
    //   setConfirmNewPassword("");
    //   setError("");
    // } catch (error) {
    //   // Handle reauthentication error
    //   setError("Invalid current password. Please try again.");
    //   console.error("Reauthentication error:", error);
    // }
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="wrapper">
      <Sidebar sidebarCollapsed={sidebarCollapsed} />
      <section className="main">
        <Navbar2 toggleSidebar={toggleSidebar} />
        <main className="content px-3 py-2 bg-secondary bg-opacity-10">
          <div className="container-fluid">
            <div className="mb-3">
              <h1 className="fw-bold">Account Settings</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Account Settings
                  </li>
                </ol>
              </nav>
            </div>
            <div className=" mt-5 d-flex  ">
              <div className="containerSetting h-auto  p-5 border-light shadow-sm">
                <form onSubmit={handleSubmit}>
                  <h2>Change Password</h2>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="mb-3 mt-3">
                    <label htmlFor="currentPassword" className="form-label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmNewPassword" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default AccountSettings;

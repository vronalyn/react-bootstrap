import React, { useState, useEffect } from "react";
import "./profile.css";
import Sidebar from "../../components/Sidebar";
import Navbar2 from "../../components/Navbar2";

import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doGetUserAccount, doUpdateProfile } from "../../firebase/auth";
import { db, storage } from "../../firebase/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

function Profile() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const [per, setPerc] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  useEffect(() => {
    const uploadFile = () => {
      const fileName = currentUser.uid + "_" + file.name;
      setFileName(fileName);
      console.log("file name: " + fileName);
      const storageRef = ref(storage, "userImage/" + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    };

    if (file) {
      uploadFile();
      setShowButtons(true); // Show buttons when a file is selected
    } else {
      setShowButtons(false); // Hide buttons when no file is selected
    }
  }, [file]);

  const handleUpdateImage = () => {
    // Logic to handle updating image
  };

  const handleUploadCancel = () => {
    setFile(null); // Clear the selected file
    setShowButtons(false); // Hide buttons
  };

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const userData = await doGetUserAccount(currentUser.uid);
          setUserData(userData);
          setPhoneNumber(userData.phoneNumber || "Update your phone number");
          setAddress(userData.address || "Update your address");
        } catch (error) {
          console.error("Error fetching user account data:", error);
        }
      };
      fetchUserData();
    }
  }, [currentUser]);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setPhoneNumber(userData.phoneNumber || "Update your phone number");
    setAddress(userData.address || "Update your address");
    setEditMode(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Call the function with input values
      await doUpdateProfile(phoneNumber, address, currentUser.uid);
      // setFirstname("");
      // setLastname("");
      // setRole("");
      setEditMode(false);
    } catch (error) {
      // Handle errors here
      console.error("Error creating user:", error);
    }
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  return (
    <div className="wrapper ">
      <Sidebar sidebarCollapsed={sidebarCollapsed} />
      <section className="main">
        <Navbar2 toggleSidebar={toggleSidebar} />
        <main className="content px-3 py-2 bg-secondary bg-opacity-10">
          <div className="container-fluid">
            <div className="mb-3">
              <h1 className="fw-bold">Profile</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Profile
                  </li>
                </ol>
              </nav>
            </div>

            <div className=" mt-5 ">
              {userData && (
                <div className="row  px-3  containerProfile d-flex gap-xs-5 gap-sm-4 ">
                  <div className=" col-sm-4 col-md-4 ">
                    <div className="containerProfileImg d-flex flex-column align-items-center py-5 px-5 border-light shadow-sm">
                      <div className="profileImg bg-primary rounded-circle d-flex align-items-center justify-content-center">
                        <form action="">
                          {file && file !== null ? (
                            <img
                              className="profileImg rounded-circle text-bg-primary object-fit-cover"
                              src={URL.createObjectURL(file)}
                              alt=""
                            />
                          ) : userData.profileImage ? (
                            <img
                              src={userData.profileImage}
                              className="profileImg rounded-circle text-bg-primary object-fit-cover"
                              alt="Profile"
                            />
                          ) : (
                            <span className="text-center fw-bold text-uppercase">
                              {userData.firstname &&
                                userData.firstname.charAt(0)}
                              {userData.lastname && userData.lastname.charAt(0)}
                            </span>
                          )}

                          <div className="containerCamera">
                            <label htmlFor="file">
                              <i className="bx bx-camera"></i>
                            </label>
                            <input
                              type="file"
                              id="file"
                              onChange={(e) => setFile(e.target.files[0])}
                              style={{ display: "none" }}
                            />
                          </div>
                        </form>
                      </div>
                      {showButtons && (
                        <div className="mt-3 d-flex gap-3 ">
                          <button
                            onClick={handleUpdateImage}
                            className="btn btn-primary "
                          >
                            Update Image
                          </button>
                          <button
                            className="btn btn-light "
                            onClick={handleUploadCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      <h5 className="text-capitalize mt-3">
                        {userData.firstname} {userData.lastname}
                      </h5>
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="border-light shadow-sm generalInfo col-sm-7 col-md-7 px-3 py-4">
                    {editMode && (
                      <div className="d-flex  mb-3 pe-3">
                        <h5>General Info</h5> &nbsp;
                        <span className="text-primary">
                          (<i className="bx bxs-edit"></i> Edit)
                        </span>
                      </div>
                    )}
                    {!editMode && (
                      <div className="d-flex justify-content-between mb-3 pe-3">
                        <h5>General Info</h5>
                        <div>
                          <button
                            onClick={handleEditProfile}
                            className="px-3 rounded-pill border-0 btn btn-primary "
                          >
                            Edit Profile
                          </button>
                        </div>
                      </div>
                    )}

                    <form>
                      {!editMode && (
                        <div className="row px-1">
                          <div className="mb-2 generalInfoInput ">
                            <label className="">Name</label>
                            <div className="wrap-generalInfoInput">
                              <input
                                className="  text-capitalize form-control-plaintext"
                                plaintext
                                readOnly
                                defaultValue={`${userData.firstname} ${userData.lastname}`}
                              />
                            </div>
                          </div>
                          <div className="mb-2 generalInfoInput">
                            <label className="5 text-truncate">Email</label>
                            <div className="wrap-generalInfoInput">
                              <input
                                className=" form-control-plaintext"
                                plaintext
                                readOnly
                                defaultValue={userData.email}
                              />
                            </div>
                          </div>
                          <div className="mb-2 generalInfoInput ">
                            <label className="col-sm-4 col-5 ">Gender</label>
                            <div className="wrap-generalInfoInput">
                              <input
                                className="col-sm-8 col-7  form-control-plaintext"
                                plaintext
                                readOnly
                                defaultValue={
                                  userData.gender || "Update your gender"
                                }
                              />
                            </div>
                          </div>

                          <div className="mb-2 generalInfoInput">
                            <label className="">Phone Number</label>
                            <div className="wrap-generalInfoInput">
                              <input
                                className=" form-control-plaintext"
                                plaintext
                                readOnly
                                defaultValue={phoneNumber}
                              />
                            </div>
                          </div>

                          <div className="generalInfoInput">
                            <label className=" text-truncate">Address</label>
                            <div className="wrap-generalInfoInput">
                              <input
                                className="  form-control-plaintext"
                                plaintext
                                readOnly
                                defaultValue={address}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {editMode && (
                        <div>
                          <div className="row px-1">
                            <div className="mb-2 generalInfoInput ">
                              <label className="">Name</label>
                              <div className="wrap-generalInfoInput">
                                <input
                                  className="  text-capitalize form-control-plaintext"
                                  plaintext
                                  readOnly
                                  defaultValue={`${userData.firstname} ${userData.lastname}`}
                                />
                              </div>
                            </div>
                            <div className="mb-2 generalInfoInput">
                              <label className="5 text-truncate">Email</label>
                              <div className="wrap-generalInfoInput">
                                <input
                                  className=" form-control-plaintext"
                                  plaintext
                                  readOnly
                                  defaultValue={userData.email}
                                />
                              </div>
                            </div>
                            <div className="mb-2 generalInfoInput ">
                              <label className="col-sm-4 col-5 ">Gender</label>
                              <div className="wrap-generalInfoInput">
                                <input
                                  className="col-sm-8 col-7  form-control-plaintext"
                                  plaintext
                                  readOnly
                                  defaultValue={
                                    userData.gender || "Update your gender"
                                  }
                                />
                              </div>
                            </div>

                            <div className="mb-2 generalInfoInput">
                              <label className="">
                                <span className="text-danger">&#42;</span>Phone
                                Number
                              </label>
                              <div className="wrap-generalInfoInput">
                                <input
                                  type="number"
                                  className=" form-control generalEditInput"
                                  placeholder="Enter Your Phone number"
                                  defaultValue={phoneNumber}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            <div className="generalInfoInput">
                              <label className=" text-truncate">
                                <span className="text-danger">&#42;</span>
                                Address
                              </label>
                              <div className="wrap-generalInfoInput">
                                <input
                                  type="text"
                                  className="  form-control generalEditInput"
                                  placeholder="Enter your Address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex gap-3 mt-5">
                            <button
                              onClick={handleCancel}
                              className="btn btn-light "
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSave}
                              className="btn btn-primary"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Profile;

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        // Handle specific error cases
        if (error.code === "auth/invalid-email") {
          setErrorMessage("Invalid email address. Please check and try again.");
        } else {
          // Handle generic error cases
          setErrorMessage("An error occurred. Please try again later.");
        }
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <div className="custom-container bg-dark">
        <div className="vh-100 d-flex flex-column flex-md-row">
          {/* Image Section */}
          <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center bg-transparent bg-light">
            <div className="w-75">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div
                    className="rounded-3 shadow"
                    style={{
                      backgroundImage: `url('./images/data-visualization.png')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "400px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="col-md-6 d-flex justify-content-center align-items-center text-white">
            <div className="form-container p-5 text-center text-md-start">
              <p className="fs-4 lh-1">Welcome Back!</p>
              <h1 className="fw-bold">Login to your Account.</h1>
              <p>Some notes or instructions here.</p>

              <form onSubmit={onSubmit} action="">
                <div className="mt-5 text-light">
                  {errorMessage && (
                    <span className="text-red-600 font-bold">
                      {errorMessage}
                    </span>
                  )}
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text"
                      style={{ backgroundColor: "#24234A" }}
                    >
                      <i className="bx bx-at text-white"></i>
                    </span>
                    <div className="form-floating ">
                      <input
                        type="email"
                        className="form-control text-light"
                        id="floatingInputGroup2"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        style={{ backgroundColor: "#1B1A38" }}
                      />
                      <label htmlFor="floatingInputGroup2">Email</label>
                    </div>
                  </div>

                  <div className="input-group mb-3">
                    <span
                      className="input-group-text"
                      style={{ backgroundColor: "#24234A" }}
                    >
                      <i className="bx bx-lock text-white"></i>
                    </span>
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control text-light"
                        id="floatingInputGroup1"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        style={{ backgroundColor: "#1B1A38" }}
                      />
                      <label htmlFor="floatingInputGroup1">Password</label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-custom py-2 px-5 mt-4"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";

const Login = () => {
  return (
    <div>
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

              <div className="mt-5 text-light">
                <div className="input-group mb-3">
                  <span className="input-group-text" style={{ backgroundColor: '#24234A' }}>
                  <i class='bx bx-at text-white' ></i>
                  </span>
                  <div className="form-floating ">
                    <input type="text" className="form-control text-light" id="floatingInputGroup1" placeholder="Username"
                      style={{ backgroundColor: '#1B1A38' }} />
                    <label htmlFor="floatingInputGroup2">Username</label>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" style={{ backgroundColor: '#24234A' }}>
                  <i class='bx bx-lock text-white' ></i>
                  </span>
                  <div className="form-floating">
                    <input type="password" className="form-control text-light" id="floatingInputGroup1" placeholder="Username"
                      style={{ backgroundColor: '#1B1A38' }} />
                    <label htmlFor="floatingInputGroup1">Password</label>
                  </div>
                </div>

                <button className="btn btn-light text-white py-2 px-5 mt-4">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

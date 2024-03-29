import React from "react";
import About from "../components/About";
import Contact from "../components/Contact";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <Navbar/>
      <section className='bg-dark'>
        <div className="container vh-100 d-flex text-white">
          {/* Left Side */}
          <div className="col-md-6 d-flex align-items-center">
            <div className="fw-light ">
              <h2 className="fw-light fs-1 lh-base">
                Your Ultimate
                <span className="fw-bold">
                  {" "}
                  Water <br /> Monitoring Solution
                </span>
              </h2>
              <p className="mt-3 pe-4" style={{ maxWidth: "85%" }}>
                Make a splash with WaterMS, the cutting-edge platform
                revolutionizing how you manage water consumption. Streamline your
                water usage like never before and embark on a journey towards
                sustainable living.
              </p>
              <Link to='/login' className="btn btn-light text-white mt-3 px-5 py-2">
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div
                    className="rounded-3 shadow border border-info"
                    style={{
                      backgroundImage: `url('./images/unsplash-water.jpg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "250px",
                    }}
                  ></div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div
                    className="rounded-3 shadow border border-info"
                    style={{
                      backgroundImage: `url('./images/washing.webp')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "250px",
                    }}
                  ></div>
                </div>
                <div className="col-md-6">
                  <div
                    className="rounded-3 shadow border border-info"
                    style={{
                      backgroundImage: `url('./images/glass.webp')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "250px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="about">
        <About/>
      </div>

      <div id="contact">
        <Contact/>
      </div>

    </div>
  );
};

export default Landing;

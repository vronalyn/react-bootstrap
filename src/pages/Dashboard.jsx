import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar2 from "../components/Navbar2";
import Cards from "../components/Cards";
import Logs from "../components/Logs";
import Chart from "../components/Chart";
import TotalWeekly from "./TotalWeekly";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="">
      <div className="wrapper ">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <div className="main">
          <Navbar2 toggleSidebar={toggleSidebar} />
          <main className="content px-3 py-2 bg-secondary bg-opacity-10">
            <div className="container-fluid">
              <div className="mb-3">
                <h1 className="fw-bold">Dashboard</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Dashboard
                    </li>
                  </ol>
                </nav>
              </div>

              <Cards />

              <div className="row">
                <div className="col-md-8">
                  <div className="row mb-4">
                    <div className="col-md-12 d-flex align-items-center">
                      <div className="col-8 col-md-8">
                        <div className="heading-text">
                          <h3 className="lh-1 fw-bold">Realtime Analytics</h3>
                          <p>Write a short description here.</p>
                        </div>
                      </div>

                      <div className="col-4 col-md-4 ">
                        <div className="d-flex justify-content-end ">
                          <a href="#">view all</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* added */}
                  <TotalWeekly />

                  <Chart />
                </div>

                <div className="col-md-4">
                  <Logs />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

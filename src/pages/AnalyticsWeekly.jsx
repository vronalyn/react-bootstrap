import React, { useState, useEffect } from "react";
import Navbar2 from "../components/Navbar2";
import Sidebar from "../components/Sidebar";
import TotalWeekly from "./TotalWeekly";

const AnalyticsWeekly = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  return (
    <div>
      <div className="wrapper ">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <div className="main">
          <Navbar2 toggleSidebar={toggleSidebar} />
          <main className="content px-3 py-2 bg-secondary bg-opacity-10">
            <div className="container-fluid">
              <div className="mb-3">
                <h1 className="fw-bold">Weekly</h1>
                <nav aria-label="breadcrumb"></nav>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <div className="row mb-4">
                    <div className="col-md-12 d-flex align-items-center">
                      <div className="col-8 col-md-8">
                        <div className="heading-text">
                          {/* <h3 className="lh-1 fw-bold">Realtime Analytics</h3> */}
                          <p>
                            Explore weekly water usage totals for each building.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* added */}
                  <TotalWeekly />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWeekly;

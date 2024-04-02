import React, { useState } from "react";
import "./billing.css";
import BillingDetails from "./BillingDetails";
import BillingRates from "./BillingRates";
import BillingHistory from "./BillingHistory";
import Sidebar from "../../components/Sidebar";
import Navbar2 from "../../components/Navbar2";
import { Link } from "react-router-dom";

function BillingPage() {
  const [activeTab, setActiveTab] = useState("Details"); // State to track active tab

  // Function to handle click on tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Content to be displayed for each tab
  const tabContent = {
    Details: <BillingDetails />,
    Rates: <BillingRates />,
    History: <BillingHistory />,
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
              <h1 className="fw-bold">Profile</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Billing Management
                  </li>
                </ol>
              </nav>
            </div>

            <div className=" mt-5 d-flex align-items-center justify-content-center ">
              <div className="wrap-billingTab">
                <ul className="billingTab">
                  {Object.keys(tabContent).map((tabName) => (
                    <li
                      key={tabName}
                      className={` ${activeTab === tabName ? "active" : ""}`}
                      onClick={() => handleTabClick(tabName)}
                    >
                      {tabName}
                    </li>
                  ))}
                </ul>
                <div className="wrap-tabcontent">{tabContent[activeTab]}</div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default BillingPage;

import React, { useState, useEffect } from "react";

// added
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
} from "@firebase/firestore";
import { db } from "../../firebase/firebase";

import Sidebar from "../../components/Sidebar";
import Navbar2 from "../../components/Navbar2";
import HourlyChart from "../../components/HourlyChart";
import Weekly from "../Weekly";
import Monthly from "../Monthly";

const BuildingCCS = ({ activeTab }) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const [specificDate, setSpecificDate] = useState("");

  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [RightData, setRightData] = useState({});
  const [LeftData, setLeftData] = useState({});

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const dateValue = selectedDate || currentDate;
    const date = new Date(dateValue);
    setSpecificDate(date);
    fetchData(date);

    // Schedule fetchData to run every hour
    const intervalId = setInterval(() => {
      fetchData(date);
    }, 3600000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [selectedDate, activeTab]);

  const handleDateChange = (event) => {
    const dateValue = event.target.value;

    if (!dateValue) {
      // If dateValue is empty, return "none"
      setSelectedDate("");
      setLeftData({});
      setRightData({});
    } else {
      setSelectedDate(dateValue);
      console.log(`Selected Date: ${dateValue}`);
      // Convert selected date to UTC+8
      const date = new Date(dateValue);
      // date.setHours(date.getHours() + 8); // Convert to UTC+8
      const specificDate = date.toISOString();
      setSpecificDate(specificDate);
    }
  };

  // storing if data does not exists
  const fetchData = async (specificDate) => {
    try {
      // Construct the start and end date for querying Firestore
      const start = new Date(specificDate);
      // start.setHours(start.getHours() - 8);
      const end = new Date(specificDate);
      end.setDate(end.getDate() + 1); // Add 1 day
      // end.setHours(end.getHours() - 8);
      console.log("Start : ", start);
      console.log("End : ", end);

      await fetchDataForLocation("CCSRight", start, end, "CCS", setRightData);
      await fetchDataForLocation("CCSLeft", start, end, "CCS", setLeftData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchDataForLocation = async (
    location,
    start,
    end,
    database,
    setData
  ) => {
    try {
      console.log(`Fetching ${location} data from Firestore...`);

      // Clear the existing data state
      setData({});

      // Loop for the current day (midnight to 11:00 PM)
      for (let hour = 8; hour < 24; hour++) {
        const hourStart = new Date(start);
        hourStart.setHours(hour);
        const hourEnd = new Date(start);
        hourEnd.setHours(hour + 1);

        const unsubscribe = onSnapshot(
          query(
            collection(db, database),
            where("location", "==", location),
            where("DateTime", ">=", hourStart),
            where("DateTime", "<=", hourEnd),
            orderBy("DateTime", "desc"),
            limit(1)
          ),
          (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            console.log(
              `Hour Range : ${hourStart.toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                hour12: true,
              })}-${hourEnd.toLocaleString("en-US", {
                hour: "numeric",
                hour12: true,
              })}`
            );
            console.log(`${location} Data:`, data);

            // Update the corresponding state variable based on the hour
            setData((prevState) => ({
              ...prevState,
              [`${hourStart}-${hourEnd}`]: data,
            }));
          },
          (error) => {
            console.error(`Error fetching ${location} data: `, error);
          }
        );
      }

      // Loop for the next day until 8:00 AM
      const nextDayStart = new Date(start);
      nextDayStart.setDate(nextDayStart.getDate() + 1); // Move to the next day
      for (let hour = 0; hour < 8; hour++) {
        const hourStart = new Date(nextDayStart);
        hourStart.setHours(hour);
        const hourEnd = new Date(nextDayStart);
        hourEnd.setHours(hour + 1);

        const unsubscribe = onSnapshot(
          query(
            collection(db, database),
            where("location", "==", location),
            where("DateTime", ">=", hourStart),
            where("DateTime", "<=", hourEnd),
            orderBy("DateTime", "desc"),
            limit(1)
          ),
          (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            console.log(
              `Hour Range : ${hourStart.toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                hour12: true,
              })}-${hourEnd.toLocaleString("en-US", {
                hour: "numeric",
                hour12: true,
              })}`
            );
            console.log(`${location} Data:`, data);

            setData((prevState) => ({
              ...prevState,
              [`${hourStart}-${hourEnd}`]: data,
            }));
          },
          (error) => {
            console.error(`Error fetching ${location} data: `, error);
          }
        );
      }
    } catch (error) {
      console.error(`Error fetching ${location} data: `, error);
    }
  };

  // added

  return (
    <div>
      <div className="wrapper ">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <div className="main">
          <Navbar2 toggleSidebar={toggleSidebar} />
          <main className="content px-3 py-2 bg-secondary bg-opacity-10">
            <div className="container-fluid">
              <div className="mb-3">
                <h1 className="fw-bold">College of Computer Studies</h1>
                <nav aria-label="breadcrumb"></nav>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="row mb-4">
                    <div className="col-md-12 d-flex align-items-center">
                      <div className="col-8 col-md-8">
                        <div className="heading-text">
                          {/* <h3 className="lh-1 fw-bold">Realtime Analytics</h3> */}
                          <p>View different insights here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* added */}

                  {/*  */}
                  <div className="card widget-card border-light shadow-sm">
                    <div className="card-body p-4">
                      <div className="d-block d-sm-flex align-items-center justify-content-between mb-3">
                        <div className="mb-3 mb-sm-0">
                          <h5 className="card-title widget-card-title">
                            Last 24 hours
                          </h5>
                          <p>College of Computer Studies</p>
                          <p className="reminder">
                            Please be advised that data collection for the
                            selected date begins at 8AM and concludes at 8AM the
                            following day.
                          </p>
                        </div>
                        <div>
                          <div className="form-card">
                            <form action="POST">
                              <input
                                type="date"
                                id="date"
                                name="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                      <HourlyChart
                        height={450}
                        building="College of Computer Studies"
                        type="line"
                        right={RightData}
                        left={LeftData}
                      />
                    </div>
                    <div id="bsb-chart-1"></div>
                  </div>

                  {/* Weekly */}
                  <Weekly activeTab={activeTab} />

                  {/* Monthly */}
                  <Monthly activeTab={activeTab} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BuildingCCS;

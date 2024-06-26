import Sidebar from "../components/Sidebar";
import Navbar2 from "../components/Navbar2";
import React, { useEffect, useState } from "react";

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
import { db } from "../firebase/firebase";
import MonthlyChart from "../components/MonthlyChart";

const Monthly = ({ activeTab }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  //   added
  const [isActiveDorm, setIsActiveDorm] = useState(false);
  const [isActiveCCS, setIsActiveCCS] = useState(false);
  const [selectedOptionDorm, setSelectedOptionDorm] = useState(
    "Select Tank Location"
  );
  const [selectedOptionCCS, setSelectedOptionCCS] = useState(
    "Select Tank Location"
  );

  const [selectedTankDorm, setSelectedTankDorm] = useState("");
  const [selectedTankCCS, setSelectedTankCCS] = useState("");

  const [selectedMonthDorm, setSelectedMonthDorm] = useState("");
  const [selectedMonthCCS, setSelectedMonthCCS] = useState("");
  const [dateRangeDorm, setDateRangeDorm] = useState({ start: "", end: "" });
  const [dateRangeCCS, setDateRangeCCS] = useState({ start: "", end: "" });

  const [CCSRightData, setCCSRightData] = useState({});
  const [CCSLeftData, setCCSLeftData] = useState({});
  const [DormRightData, setDormRightData] = useState({});
  const [DormLeftData, setDormLeftData] = useState({});

  const [isLoadingDorm, setIsLoadingDorm] = useState(false);
  const [isLoadingCCS, setIsLoadingCCS] = useState(false);

  const [formattedStartDateDorm, setFormattedStartDateDorm] = useState("");
  const [formattedEndDateDorm, setFormattedEndDateDorm] = useState("");
  const [formattedStartDateCCS, setFormattedStartDateCCS] = useState("");
  const [formattedEndDateCCS, setFormattedEndDateCCS] = useState("");

  const toggleOptionsDorm = () => {
    setIsActiveDorm(!isActiveDorm);
    setIsActiveCCS(false);
  };

  const toggleOptionsCCS = () => {
    setIsActiveCCS(!isActiveCCS);
    setIsActiveDorm(false);
  };

  const handleOptionClickDorm = (value, optionText) => {
    setSelectedOptionDorm(optionText);
    setSelectedTankDorm(value);
    console.log(value);
  };

  const handleOptionClickCCS = (value, optionText) => {
    setSelectedOptionCCS(optionText);
    setSelectedTankCCS(value);
    console.log(value);
  };

  const handleMonthChangeDorm = (event) => {
    let monthValue = event.target.value;
    if (!monthValue) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      monthValue = `${currentYear}-${currentMonth}`;
    }
    setSelectedMonthDorm(monthValue);
    handleMonthChange(monthValue, setDateRangeDorm);
    console.log(`Selected Month (Dorm): ${monthValue}`);
  };

  const handleMonthChangeCCS = (event) => {
    let monthValue = event.target.value;
    if (!monthValue) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      monthValue = `${currentYear}-${currentMonth}`;
    }
    setSelectedMonthCCS(monthValue);
    handleMonthChange(monthValue, setDateRangeCCS);
    console.log(`Selected Month (CCS): ${monthValue}`);
  };

  const calculateDateRange = (year, month) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Find the first Monday of the month
    const firstMonday = new Date(startDate);
    firstMonday.setDate(1);
    while (firstMonday.getDay() !== 1) {
      firstMonday.setDate(firstMonday.getDate() + 1);
    }

    // Add one day to make it Tuesday
    const firstTuesday = new Date(firstMonday);
    firstTuesday.setDate(firstMonday.getDate() + 1);

    // Find the last day of the month
    const lastDayOfMonth = new Date(endDate);

    // Adjust the end date to the last day of the last week by ensuring it ends on a Sunday
    let endDateOfLastWeek = new Date(lastDayOfMonth);
    if (endDateOfLastWeek.getDay() !== 0) {
      // If it's not already Sunday
      endDateOfLastWeek.setDate(
        endDateOfLastWeek.getDate() + (7 - endDateOfLastWeek.getDay())
      );
    }

    // Add one day to include the first day of the following week
    endDateOfLastWeek.setDate(endDateOfLastWeek.getDate() + 1);

    const formattedStartDate = firstTuesday.toISOString().substring(0, 10);
    const formattedEndDate = endDateOfLastWeek.toISOString().substring(0, 10);

    return { start: formattedStartDate, end: formattedEndDate };
  };

  // useEffect to set initial values
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const formattedCurrentMonth = `${currentYear}-${currentMonth}`;

    setSelectedMonthDorm(formattedCurrentMonth);
    setSelectedMonthCCS(formattedCurrentMonth);

    const { start, end } = calculateDateRange(currentYear, currentMonth);

    setDateRangeDorm({ start, end });
    setDateRangeCCS({ start, end });

    console.log(`Date Range: ${start} - ${end}`);
    console.log("Initial Selected Month:", formattedCurrentMonth);
  }, []);

  // handleMonthChange function
  const handleMonthChange = (monthValue, setDateRange) => {
    if (monthValue) {
      const [year, month] = monthValue.split("-");
      const { start, end } = calculateDateRange(
        parseInt(year),
        parseInt(month)
      );
      setDateRange({ start, end });
      console.log(`Date Range: ${start} - ${end}`);
    } else {
      setDateRange({ start: null, end: null });
    }
  };


  const handlePrevMonth = (location) => {
    let currentMonth;
    if (location === "Dorm") {
      currentMonth = new Date(selectedMonthDorm);
    } else if (location === "CCS") {
      currentMonth = new Date(selectedMonthCCS);
    }
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    if (currentMonth.getMonth() === 11) {
      // If the current month is December, go back to November of the same year
      currentMonth.setFullYear(currentMonth.getFullYear() - 1);
    }
    const formattedMonth = currentMonth.toISOString().substring(0, 7);
    if (location === "Dorm") {
      setSelectedMonthDorm(formattedMonth);
      handleMonthChangeDorm({ target: { value: formattedMonth } });
    } else if (location === "CCS") {
      setSelectedMonthCCS(formattedMonth);
      handleMonthChangeCCS({ target: { value: formattedMonth } });
    }
  };

  const handleNextMonth = (location) => {
    let currentMonth;
    if (location === "Dorm") {
      currentMonth = new Date(selectedMonthDorm);
    } else if (location === "CCS") {
      currentMonth = new Date(selectedMonthCCS);
    }
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    const formattedMonth = currentMonth.toISOString().substring(0, 7);
    if (location === "Dorm") {
      setSelectedMonthDorm(formattedMonth);
      handleMonthChangeDorm({ target: { value: formattedMonth } });
    } else if (location === "CCS") {
      setSelectedMonthCCS(formattedMonth);
      handleMonthChangeCCS({ target: { value: formattedMonth } });
    }
  };

  useEffect(() => {
    fetchData(
      selectedMonthDorm,
      dateRangeDorm,
      setDormRightData,
      setDormLeftData,
      "Dorm",
      selectedTankDorm
    );
  }, [selectedMonthDorm, dateRangeDorm, selectedTankDorm]);

  useEffect(() => {
    fetchData(
      selectedMonthCCS,
      dateRangeCCS,
      setCCSRightData,
      setCCSLeftData,
      "CCS",
      selectedTankCCS
    );
  }, [selectedMonthCCS, dateRangeCCS, selectedTankCCS]);

  const fetchData = async (
    selectedMonth,
    setDateRange,
    setRightData,
    setLeftData,
    locationType,
    selectedTank
  ) => {
    let isLoading =
      locationType === "Dorm" ? setIsLoadingDorm : setIsLoadingCCS;

    try {
      isLoading(true);

      if (selectedMonth && setDateRange.start && setDateRange.end) {
        const [year, month] = selectedMonth.split("-");
        const startDate = new Date(year, parseInt(month) - 1, 1);
        const endDate = new Date(year, parseInt(month), 0);
        const formattedStartDate = startDate.toISOString().substring(0, 10);
        const formattedEndDate = endDate.toISOString().substring(0, 10);

        const startISO = new Date(setDateRange.start);
        console.log("Start Date - iso:", startISO);

        const endISO = new Date(setDateRange.end);
        console.log("End Date - iso:", endISO);

        const rightLocation = locationType + "Right";
        const leftLocation = locationType + "Left";

        await fetchDataForLocation(
          rightLocation,
          startISO,
          endISO,
          locationType,
          setRightData,
          selectedTank
        );
        await fetchDataForLocation(
          leftLocation,
          startISO,
          endISO,
          locationType,
          setLeftData,
          selectedTank
        );
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      isLoading(false);
    }
  };

  const fetchDataForLocation = async (
    location,
    startDate,
    endDate,
    database,
    setData,
    selectedTank
  ) => {
    try {
      const data = [];
      let start = new Date(startDate); // Start from the provided start date in the date range
      const end = new Date(endDate);

      console.log(`Fetching ${location} data from Firestore...`);

      while (start <= end) {
        let weekEndDate = new Date(start);
        weekEndDate.setDate(weekEndDate.getDate() + 6); // Determine the end of the week

        // Ensure the week's end does not go beyond the overall end date
        if (weekEndDate > end) {
          weekEndDate = end;
        }

        const weeklyData = [];
        let currentDay = new Date(start);
        const weekEnd = new Date(weekEndDate);
        while (currentDay <= weekEnd) {
          const querySnapshot = await getDocs(
            query(
              collection(db, database),
              where("location", "==", location),
              where("DateTime", ">=", currentDay),
              where("DateTime", "<", new Date(currentDay.getTime() + 86400000)), // Next day
              orderBy("DateTime", "desc"),
              limit(1)
            )
          );

          const dailyData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Formatting date for console log
          const formattedDate = currentDay.toISOString().split("T")[0];

          // console.log(`${location} Data for ${formattedDate}:`, dailyData);

          weeklyData.push({
            date: formattedDate,
            entries: dailyData,
          });

          // Move to the next day
          currentDay.setDate(currentDay.getDate() + 1);
        }

        // Formatting dates for console log
        const formattedStartDate = start.toISOString().split("T")[0];
        const formattedEndDate = weekEndDate.toISOString().split("T")[0];

        console.log(
          `${location} Data for Week ${formattedStartDate} to ${formattedEndDate}:`,
          weeklyData
        );

        data.push({
          start: formattedStartDate,
          end: formattedEndDate,
          entries: weeklyData,
        });

        // Set the start to one day after the current week's end date for the next iteration
        start = new Date(weekEndDate.getTime() + 86400000); // +1 day in milliseconds
      }

      setData(data);
    } catch (error) {
      console.error(`Error fetching ${location} data: `, error);
    }
  };

  useEffect(() => {
    // Format date for Dorm
    if (dateRangeDorm.start && dateRangeDorm.end) {
      const startDateDorm = new Date(dateRangeDorm.start);
      const endDateDorm = new Date(dateRangeDorm.end);
      const formattedStartDateDorm = startDateDorm.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const formattedEndDateDorm = endDateDorm.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setFormattedStartDateDorm(formattedStartDateDorm);
      setFormattedEndDateDorm(formattedEndDateDorm);
    }

    // Format date for CCS
    if (dateRangeCCS.start && dateRangeCCS.end) {
      const startDateCCS = new Date(dateRangeCCS.start);
      const endDateCCS = new Date(dateRangeCCS.end);
      const formattedStartDateCCS = startDateCCS.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const formattedEndDateCCS = endDateCCS.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setFormattedStartDateCCS(formattedStartDateCCS);
      setFormattedEndDateCCS(formattedEndDateCCS);
    }
  }, [dateRangeDorm, dateRangeCCS]);

  // added
  return (
    <div>
      {/* Dorm */}
      {activeTab === "dorm" && (
        <div class="card widget-card border-light shadow-sm">
          <div class="card-body p-4">
            <div class="d-block d-sm-flex align-items-center justify-content-between mb-3">
              <div class="mb-3 mb-sm-0">
                <h5 class="card-title widget-card-title">Last 30 days</h5>
                <p>Alumni Dormitory</p>
                <p className="reminder">
                  Please be advised that new data will be added/updated daily.
                </p>
                <p className="date">
                  <i
                    className="bx bx-chevron-left icon-left"
                    onClick={() => handlePrevMonth("Dorm")}
                  ></i>
                  <span className="mx-1">{`${formattedStartDateDorm} - ${formattedEndDateDorm}`}</span>
                  <i
                    className="bx bx-chevron-right icon-right"
                    onClick={() => handleNextMonth("Dorm")}
                  ></i>
                </p>
              </div>
              <div>
                <div className="form-card">
                  <form action="POST">
                    <input
                      type="month"
                      id="monthDorm"
                      name="monthDorm"
                      value={selectedMonthDorm}
                      onChange={handleMonthChangeDorm}
                    />

                    <div className="select-menu" onClick={toggleOptionsDorm}>
                      <div className="select-btn" tabIndex="0">
                        <span className="select-text">
                          {selectedOptionDorm}
                        </span>
                        <i className="bx bx-chevron-down"></i>
                      </div>
                      <ul className={`options ${isActiveDorm ? "active" : ""}`}>
                        <li
                          className="option"
                          onClick={() =>
                            handleOptionClickDorm("", "Select Tank Location")
                          }
                        >
                          <span className="option-text">
                            Select Tank Location
                          </span>
                        </li>
                        <li
                          className="option"
                          onClick={() =>
                            handleOptionClickDorm("DormRight", "Right Tank")
                          }
                        >
                          <span className="option-text">Right Tank</span>
                        </li>
                        <li
                          className="option"
                          onClick={() =>
                            handleOptionClickDorm("DormLeft", "Left Tank")
                          }
                        >
                          <span className="option-text">Left Tank</span>
                        </li>
                      </ul>
                    </div>
                    {/* {isLoadingDorm && (
                      <p className="loading">Loading data...</p>
                    )} */}
                  </form>
                </div>
              </div>
            </div>
            {isLoadingDorm && selectedTankDorm === "" ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "400px" }}
              >
                <p className="text-center">
                  Loading chart data, please wait...
                </p>
              </div>
            ) : (
              <MonthlyChart
                height={400}
                type="line"
                // dateRange={dateRangeDorm}
                right={DormRightData}
                left={DormLeftData}
                tankLocation={selectedTankDorm}
              />
            )}
            <div id="bsb-chart-1"></div>
          </div>
        </div>
      )}

      {/* CCS */}
      {activeTab === "ccs" && (
        <div class="card widget-card border-light shadow-sm">
          <div class="card-body p-4">
            <div class="d-block d-sm-flex align-items-center justify-content-between mb-3">
              <div class="mb-3 mb-sm-0">
                <h5 class="card-title widget-card-title">Last 30 days</h5>
                <p>College of Computer Studies</p>
                <p className="reminder">
                  Please be advised that new data will be added/updated daily.
                </p>
                <p className="date">
                  <i
                    className="bx bx-chevron-left icon-left"
                    onClick={() => handlePrevMonth("CCS")}
                  ></i>
                  <span className="mx-1">{`${formattedStartDateCCS} - ${formattedEndDateCCS}`}</span>
                  <i
                    className="bx bx-chevron-right icon-right"
                    onClick={() => handleNextMonth("CCS")}
                  ></i>
                </p>
              </div>
              <div>
                <div className="form-card">
                  <form action="POST">
                    <input
                      type="month"
                      id="monthCCS"
                      name="monthCCS"
                      value={selectedMonthCCS}
                      onChange={handleMonthChangeCCS}
                    />

                    <div className="select-menu" onClick={toggleOptionsCCS}>
                      <div className="select-btn" tabIndex="0">
                        <span className="select-text">{selectedOptionCCS}</span>
                        <i className="bx bx-chevron-down"></i>
                      </div>
                      <ul className={`options ${isActiveCCS ? "active" : ""}`}>
                        <li
                          className="option"
                          onClick={() =>
                            handleOptionClickCCS("", "Select Tank Location")
                          }
                        >
                          <span className="option-text">
                            Select Tank Location
                          </span>
                        </li>
                        <li
                          className="option"
                          onClick={() =>
                            handleOptionClickCCS("CCSRight", "Right Tank")
                          }
                        >
                          <span className="option-text">Right Tank</span>
                        </li>
                        <li
                          className="option"
                          onClick={() =>
                            handleOptionClickCCS("CCSLeft", "Left Tank")
                          }
                        >
                          <span className="option-text">Left Tank</span>
                        </li>
                      </ul>
                    </div>

                    {/* {isLoadingCCS && <p className="loading">Loading data...</p>} */}
                  </form>
                </div>
              </div>
            </div>
            {isLoadingCCS && selectedTankCCS === "" ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "400px" }}
              >
                <p className="text-center">
                  Loading chart data, please wait...
                </p>
              </div>
            ) : (
              <MonthlyChart
                height={400}
                type="line"
                // dateRange={dateRangeCCS}
                right={CCSRightData}
                left={CCSLeftData}
                tankLocation={selectedTankCCS}
              />
            )}
            <div id="bsb-chart-1"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monthly;

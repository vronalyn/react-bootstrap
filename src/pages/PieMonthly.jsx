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
import PieMothlyChart from "../components/PieMothlyChart";

const PieMonthly = () => {
  // added
  const [selectedMonth, setSelectedMonth] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const [CCSRightData, setCCSRightData] = useState({});
  const [CCSLeftData, setCCSLeftData] = useState({});
  const [DormRightData, setDormRightData] = useState({});
  const [DormLeftData, setDormLeftData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");

  const [usageCCSRight, setUsageCCSRight] = useState([]);
  const [usageCCSLeft, setUsageCCSLeft] = useState([]);
  const [usageDormLeft, setUsageDormLeft] = useState([]);
  const [usageDormRight, setUsageDormRight] = useState([]);

  // ============================= Functions for total chart
  // useEffect to set initial values
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const formattedCurrentMonth = `${currentYear}-${currentMonth}`;

    setSelectedMonth(formattedCurrentMonth);

    const { start, end } = calculateDateRange(currentYear, currentMonth);

    setDateRange({ start, end });

    console.log(`Date Range: ${start} - ${end}`);
    console.log("Initial Selected Month:", formattedCurrentMonth);
  }, []);

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

  const handleMonthChange = (event) => {
    let monthValue = event.target.value;
    if (!monthValue) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      monthValue = `${currentYear}-${currentMonth}`;
    }
    setSelectedMonth(monthValue);

    // Calculate the date range based on the selected month
    const [year, month] = monthValue.split("-");
    const { start, end } = calculateDateRange(parseInt(year), parseInt(month));

    // Set the calculated date range
    setDateRange({ start, end });

    console.log(`Selected Month (Dorm): ${monthValue}`);
  };

  const handlePrevMonth = () => {
    let previousMonth = new Date(selectedMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    // Check if the month has rolled over to the previous year
    if (previousMonth.getMonth() === 11) {
      previousMonth.setFullYear(previousMonth.getFullYear() - 1);
    }

    // Format the previous month
    const formattedPreviousMonth = previousMonth.toISOString().substring(0, 7);

    // Update the selected month and trigger the month change handler
    setSelectedMonth(formattedPreviousMonth);
    handleMonthChange({ target: { value: formattedPreviousMonth } });
  };

  const handleNextMonth = () => {
    let nextMonth = new Date(selectedMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Check if the month has rolled over to the next year
    if (nextMonth.getMonth() === 0) {
      nextMonth.setFullYear(nextMonth.getFullYear() + 1);
    }

    // Format the next month
    const formattedNextMonth = nextMonth.toISOString().substring(0, 7);

    // Update the selected month and trigger the month change handler
    setSelectedMonth(formattedNextMonth);
    handleMonthChange({ target: { value: formattedNextMonth } });
  };

  useEffect(() => {
    fetchData(
      selectedMonth,
      dateRange,
      setDormRightData,
      setDormLeftData,
      "Dorm"
    );
  }, [selectedMonth, dateRange]);

  useEffect(() => {
    fetchData(selectedMonth, dateRange, setCCSRightData, setCCSLeftData, "CCS");
  }, [selectedMonth, dateRange]);

  const fetchData = async (
    selectedMonth,
    setDateRange,
    setRightData,
    setLeftData,
    locationType
  ) => {
    try {
      setIsLoading(true);

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
          setRightData
        );
        await fetchDataForLocation(
          leftLocation,
          startISO,
          endISO,
          locationType,
          setLeftData
        );
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataForLocation = async (
    location,
    startDate,
    endDate,
    database,
    setData
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
    // Format date
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      const formattedStartDate = startDate.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const formattedEndDate = endDate.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setFormattedStartDate(formattedStartDate);
      setFormattedEndDate(formattedEndDate);
    }
  }, [dateRange]);

  // added

  return (
    <div className="card widget-card border-light shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between mb-4">
          <h5 className="card-title widget-card-title">Last 30 Days</h5>
        </div>
        <p>Total Water Consumption</p>
        <p className="date">
          <i
            className="bx bx-chevron-left icon-left"
            onClick={handlePrevMonth}
          ></i>
          <span className="mx-1">{`${formattedStartDate} - ${formattedEndDate}`}</span>
          <i
            className="bx bx-chevron-right icon-right"
            onClick={handleNextMonth}
          ></i>
        </p>
        {/* </div> */}
        <div>
          {/* <select className="form-select text-secondary border-light-subtle ">
              <option selected>Right Tank</option>
              <option value="1">Left Tank</option>
            </select> */}
          <div className="form-card">
            <form action="POST">
              <input
                type="month"
                id="monthDorm"
                name="monthDorm"
                value={selectedMonth}
                onChange={handleMonthChange}
              />

              {/* {isLoading && <p className="loading">Loading data...</p>} */}
            </form>
          </div>
        </div>
      </div>

      {/* Conditionally render MonthlyChart or a loading message */}
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "400px" }}
        >
          <p className="text-center">Loading chart data, please wait...</p>
        </div>
      ) : (
        <PieMothlyChart
          height={400}
          type="pie"
          // dateRange={dateRange}
          rightCCSTotal={CCSRightData}
          leftCCSTotal={CCSLeftData}
          rightDormTotal={DormRightData}
          leftDormTotal={DormLeftData}
          tankLocation="Total"
        />
      )}

      <div id="bsb-chart-1"></div>
    </div>
    // </div>
  );
};

export default PieMonthly;

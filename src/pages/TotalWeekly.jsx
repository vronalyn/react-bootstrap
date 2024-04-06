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
import WeeklyChart from "../components/WeeklyChart";

const TotalWeekly = () => {
  // added
  const [selectedWeek, setSelectedWeek] = useState("");
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
  useEffect(() => {
    const currentDate = new Date();
    const currentWeekNumber = getWeekNumber(currentDate);
    const currentYear = currentDate.getFullYear();
    const formattedCurrentWeek = `${currentYear}-W${currentWeekNumber
      .toString()
      .padStart(2, "0")}`;
    setSelectedWeek(formattedCurrentWeek);

    // Calculate and log the date range if selectedWeek has a value
    if (formattedCurrentWeek) {
      const [year, weekNumber] = formattedCurrentWeek.split("-W");
      const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
      const endDate = new Date(year, 0, 1 + (weekNumber - 1) * 7 + 6);
      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(endDate.getDate() + 1);
      const formattedStartDate = startDate.toISOString().substring(0, 10);
      const formattedEndDate = endDate.toISOString().substring(0, 10);

      // Update the date range state variables
      setDateRange({ start: formattedStartDate, end: formattedEndDate });

      console.log(`Date Range: ${formattedStartDate} - ${formattedEndDate}`);
    }
    console.log("Initial Selected Week:", formattedCurrentWeek);
  }, []);

  const handleWeekChange = (event) => {
    const weekValue = event.target.value; // Directly get the value from the event
    setSelectedWeek(weekValue); // Update the selected week state

    // Early return if weekValue is not provided
    if (!weekValue) return;

    const [year, weekNumber] = weekValue.split("-W");
    const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const endDate = new Date(year, 0, 1 + (weekNumber - 1) * 7 + 6);

    // This depends on how you want your week to start (Sunday or Monday)
    // startDate.setDate(startDate.getDate() + (startDate.getDay() === 0 ? 1 : 0));
    // endDate.setDate(endDate.getDate() + (endDate.getDay() === 0 ? 1 : 0));

    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);

    const formattedStartDate = startDate.toISOString().substring(0, 10);
    const formattedEndDate = endDate.toISOString().substring(0, 10);

    setDateRange({ start: formattedStartDate, end: formattedEndDate }); // Update the date range state
  };

  const handlePrevWeek = () => {
    if (!selectedWeek) return;
    const [year, weekNumber] = selectedWeek.split("-W");
    const prevWeekNumber = parseInt(weekNumber, 10) - 1;
    const newSelectedWeek = `${year}-W${prevWeekNumber
      .toString()
      .padStart(2, "0")}`;
    setSelectedWeek(newSelectedWeek);
    updateDateRange(newSelectedWeek);
  };

  const handleNextWeek = () => {
    if (!selectedWeek) return;
    const [year, weekNumber] = selectedWeek.split("-W");
    const nextWeekNumber = parseInt(weekNumber, 10) + 1;
    const newSelectedWeek = `${year}-W${nextWeekNumber
      .toString()
      .padStart(2, "0")}`;
    setSelectedWeek(newSelectedWeek);
    updateDateRange(newSelectedWeek);
  };

  const updateDateRange = (week) => {
    const [year, weekNumber] = week.split("-W");
    const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const endDate = new Date(year, 0, 1 + (weekNumber - 1) * 7 + 6);
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);
    const formattedStartDate = startDate.toISOString().substring(0, 10);
    const formattedEndDate = endDate.toISOString().substring(0, 10);
    setDateRange({ start: formattedStartDate, end: formattedEndDate });
    setFormattedStartDate(formattedStartDate);
    setFormattedEndDate(formattedEndDate);
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

  useEffect(() => {
    fetchData(
      selectedWeek,
      dateRange,
      setDormRightData,
      setDormLeftData,
      "Dorm"
    );
    fetchData(selectedWeek, dateRange, setCCSRightData, setCCSLeftData, "CCS");

    const fetchDataInterval = setInterval(() => {
      fetchData(
        selectedWeek,
        dateRange,
        setDormRightData,
        setDormLeftData,
        "Dorm"
      );
      fetchData(
        selectedWeek,
        dateRange,
        setCCSRightData,
        setCCSLeftData,
        "CCS"
      );
    }, 3600000);

    return () => clearInterval(fetchDataInterval);
  }, [selectedWeek, dateRange]);

  const fetchData = async (
    selectedWeek,
    dateRange,
    setRightData,
    setLeftData,
    locationType
  ) => {
    try {
      setIsLoading(true);

      if (selectedWeek && dateRange.start && dateRange.end) {
        const [year, weekNumber] = selectedWeek.split("-W");
        const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
        const endDate = new Date(year, 0, 1 + (weekNumber - 1) * 7 + 6);
        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + 1);

        const formattedStartDate = startDate.toISOString().substring(0, 10);
        const formattedEndDate = endDate.toISOString().substring(0, 10);

        const startISO = new Date(dateRange.start);
        const endISO = new Date(dateRange.end);

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
      const currentDate = new Date(startDate);

      console.log(`Fetching ${location} data from Firestore...`);

      while (currentDate <= endDate) {
        const querySnapshot = await getDocs(
          query(
            collection(db, database),
            where("location", "==", location),
            where("DateTime", ">=", currentDate),
            where("DateTime", "<=", new Date(currentDate.getTime() + 86400000)), // Adding 24 hours to the current date
            orderBy("DateTime", "desc"),
            limit(1)
          )
        );

        const dailyData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const formattedDate =
          currentDate.getFullYear() +
          "-" +
          ("0" + (currentDate.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + currentDate.getDate()).slice(-2);

        console.log(`${location} Data for ${formattedDate}:`, dailyData);
        data.push({ date: formattedDate, entries: dailyData });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      setData(data);
    } catch (error) {
      console.error(`Error fetching ${location} data: `, error);
    }
  };

  const getWeekNumber = (date) => {
    date = new Date(date);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const yearStart = new Date(date.getFullYear(), 0, 4);
    return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  };
  // added

  return (
    <div class="card widget-card border-light shadow-sm">
      <div class="card-body p-4">
        <div class="d-block d-sm-flex align-items-center justify-content-between mb-3">
          <div class="mb-3 mb-sm-0">
            <h5 class="card-title widget-card-title">Last 7 days</h5>
            <p>Total Water Consumption</p>
            <p className="reminder">
              Please be advised that new data will be added/updated daily.
            </p>
            <p className="date">
              <i
                className="bx bx-chevron-left icon-left"
                onClick={handlePrevWeek}
              ></i>
              <span>{`${formattedStartDate} - ${formattedEndDate}`}</span>
              <i
                className="bx bx-chevron-right icon-right"
                onClick={handleNextWeek}
              ></i>
            </p>
          </div>
          <div>
            {/* <select class="form-select text-secondary border-light-subtle ">
              <option selected>Right Tank</option>
              <option value="1">Left Tank</option>
            </select> */}
            <div className="form-card">
              <form action="POST">
                <input
                  type="week"
                  id="weekCCS"
                  name="weekCCS"
                  value={selectedWeek}
                  onChange={handleWeekChange}
                />

                {isLoading && <p className="loading">Loading data...</p>}
              </form>
            </div>
          </div>
        </div>
        <WeeklyChart
          height={400}
          type="line"
          // dateRange={dateRange}
          rightCCSTotal={CCSRightData}
          leftCCSTotal={CCSLeftData}
          rightDormTotal={DormRightData}
          leftDormTotal={DormLeftData}
          tankLocation="Total"
        />
        <div id="bsb-chart-1"></div>
      </div>
    </div>
  );
};

export default TotalWeekly;

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
import PieYearlyChart from "../components/PieYearlyChart";

const PieYearly = () => {
  // added
  const [selectedYear, setSelectedYear] = useState("");

  const [fetchedData, setFetchedData] = useState({});
  const [yearlyVolumes, setYearlyVolumes] = useState({});

  const [CCSData, setCCSData] = useState({});
  const [DormData, setDormData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  // ============================= Functions for total chart

  const handlePrevYear = () => {
    const prevYear = parseInt(selectedYear) - 1;
    setSelectedYear(prevYear.toString());
  };

  const handleNextYear = () => {
    const nextYear = parseInt(selectedYear) + 1;
    setSelectedYear(nextYear.toString());
  };

  useEffect(() => {
    console.log("Selected Year:", selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setSelectedYear(currentYear.toString());
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (selectedYear) {
          // await fetchDataForLocation(
          //   "CCS",
          //   selectedYear,
          //   "yearly_report",
          //   setCCSData
          // );
          await fetchDataForLocation(
            selectedYear,
            "yearly_report",
            setFetchedData
          );
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  const fetchDataForLocation = async (year, database, setData) => {
    try {
      const data = [];
      const querySnapshot = await getDocs(
        query(
          collection(db, database),
          where("year_date", "==", parseInt(year))
        )
      );

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setData(data);

      console.log(`Data for ${year}:`, data);
    } catch (error) {
      console.error(`Error fetching data for ${year}: `, error);
    }
  };

  // Function to extract arrays from monthly reports
  const extractMonthlyArrays = (monthlyReports) => {
    return Object.values(monthlyReports).map((report) => report.monthly_report);
  };

  // Function to generate an array of months in a year
  const generateMonths = () => {
    return [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
  };

  // // Function to iterate over months within a year and extract month_total_volume
  // const extractMonthlyVolumes = (monthlyArrays) => {
  //   const monthsInYear = generateMonths();
  //   const monthlyDates = [];
  //   const yearlyVolumes = {};

  //   // Iterate over each monthly array
  //   monthlyArrays.forEach((monthlyArray) => {
  //     // Iterate over each report in the monthly array
  //     monthlyArray.forEach((report) => {
  //       // Extract the month_date
  //       const monthDate = report.month_date;
  //       // Add the month_date to the monthlyDates array if it's not already there
  //       if (!monthlyDates.includes(monthDate)) {
  //         monthlyDates.push(monthDate);
  //       }
  //     });
  //   });

  //   // Now monthlyDates contains all unique month dates
  //   console.log("Monthly Dates:", monthlyDates);
  // };

  // Function to iterate over months within a year and extract month_total_volume
  const extractMonthlyVolumes = (monthlyArrays) => {
    const monthsInYear = generateMonths();
    const yearlyVolumes = {};

    // Iterate over each month in the generated months
    monthsInYear.forEach((month) => {
      // Find the corresponding month in the extracted monthly arrays
      const monthData = monthlyArrays.find((monthlyArray) =>
        monthlyArray.find((report) => report.month_date === month)
      );

      // If monthData exists, extract the month_total_volume; otherwise, set it to 0
      const monthTotalVolume = monthData
        ? monthData.find((report) => report.month_date === month)
            .month_total_volume
        : 0;

      // Store the total volume for the month
      yearlyVolumes[month] = monthTotalVolume;
    });

    setYearlyVolumes(yearlyVolumes);
    return yearlyVolumes;
  };

  useEffect(() => {
    const monthlyArrays = extractMonthlyArrays(fetchedData);
    console.log("Monthly Arrays:", monthlyArrays);

    // Call extractMonthlyVolumes here
    const yearlyData = extractMonthlyVolumes(monthlyArrays);
    console.log("Yearly Extracted Data:", yearlyVolumes);
  }, [fetchedData]);

  return (
    <div className="card widget-card border-light shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between mb-4">
          <h5 className="card-title widget-card-title">Last 12 months</h5>
        </div>
        <p>Total Water Consumption</p>
        <p className="date">
          <i
            className="bx bx-chevron-left icon-left"
            onClick={handlePrevYear}
          ></i>
          <span className="mx-1">{`${selectedYear}`}</span>
          <i
            className="bx bx-chevron-right icon-right"
            onClick={handleNextYear}
          ></i>
        </p>
        {/* </div> */}
        <div>
          <div className="form-card">
            <form action="POST">
              <input
                type="number"
                id="year"
                name="year"
                value={selectedYear}
                onChange={handleYearChange}
              />
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
        <PieYearlyChart
          height={400}
          type="pie"
          tankLocation="Total"
          data={yearlyVolumes}
        />
      )}

      <div id="bsb-chart-1"></div>
      {/* </div> */}
    </div>
  );
};

export default PieYearly;

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const MonthlyChart = ({
  colors,
  height,
  right,
  left,
  // dateRange,
  type,
  tankLocation,
  rightCCSTotal,
  leftCCSTotal,
  rightDormTotal,
  leftDormTotal,
}) => {
  const [dates, setDates] = useState([]);
  const [totalVolumes, setTotalVolumes] = useState([]);
  const [grandTotalVolume, setGrandTotalVolume] = useState(0);
  const [state, setState] = useState({
    series: [
      {
        name: "Right",
        data: [],
      },
      {
        name: "Left",
        data: [],
      },
      {
        name: "Total",
        data: [],
      },
    ],

    options: {
      chart: {
        type: `${type}`,
        // stacked: true,
        height: `${height}`,
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "smooth",
      },
      markers: {
        size: 6,
        hover: {
          size: 8,
        },
      },
      xaxis: {
        labels: {
          style: {
            fontSize: "12px", // Adjust the font size here
          },
        },
      },
      yaxis: {
        title: {
          text: "Volume",
        },
        opposite: false,
        labels: {
          style: {
            fontSize: "10px",
          },
          formatter: function (value) {
            // Check if the value is undefined
            if (value === undefined) {
              return "0.00";
            } else {
              return value.toFixed(2);
            }
          },
        },
      },
      legend: {
        position: "top",
      },
      tooltip: {
        style: {
          fontSize: "14px",
        },
      },
      grid: {
        borderColor: "#f0f0f0",
      },
    },
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

  useEffect(() => {
    console.log("Right Data:", right);
    console.log("Left Data:", left);
  }, [right, left]);

  // ==================================== to display the data in html
  // useEffect(() => {
  //   if (right && left) {
  //     const rightVolumes = Object.values(right).map((week) =>
  //       week.entries.reduce((acc, entry) => acc + entry.volume, 0)
  //     );
  //     const leftVolumes = Object.values(left).map((week) =>
  //       week.entries.reduce((acc, entry) => acc + entry.volume, 0)
  //     );

  //     setState((prevState) => ({
  //       ...prevState,
  //       series: [
  //         {
  //           name: "Right",
  //           data: rightVolumes,
  //         },
  //         {
  //           name: "Left",
  //           data: leftVolumes,
  //         },
  //       ],
  //     }));
  //   }
  // }, [right, left]);

  // ========================================== dynamic tank location

  const calculateWeeklyVolumes = (data) => {
    const weeklyVolumes = [];
    Object.values(data).forEach((week) => {
      let weeklyTotal = 0;
      week.entries.forEach((dateEntry) => {
        dateEntry.entries.forEach((entry) => {
          weeklyTotal += parseFloat(entry.volume);
        });
      });
      weeklyVolumes.push(weeklyTotal.toFixed(2));
    });
    return weeklyVolumes;
  };

  useEffect(() => {
    let grandTotal = 0;

    // Check if tankLocation is provided
    if (tankLocation) {
      let selectedRightData, selectedLeftData;

      // Determine which data to select based on tankLocation
      if (tankLocation === "DormRight" || tankLocation === "CCSRight") {
        selectedRightData = right;
        selectedLeftData = null;
      } else if (tankLocation === "DormLeft" || tankLocation === "CCSLeft") {
        selectedRightData = null;
        selectedLeftData = left;
      }

      const combinedWeeklyVolumes = {
        right: selectedRightData
          ? calculateWeeklyVolumes(selectedRightData)
          : [],
        left: selectedLeftData ? calculateWeeklyVolumes(selectedLeftData) : [],
      };

      const combinedSeriesData = {
        right: selectedRightData
          ? combinedWeeklyVolumes.right.map((volume, index) => ({
              x: `Week ${index + 1}`,
              y: parseFloat(volume),
            }))
          : [],
        left: selectedLeftData
          ? combinedWeeklyVolumes.left.map((volume, index) => ({
              x: `Week ${index + 1}`,
              y: parseFloat(volume),
            }))
          : [],
      };

      setState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Right",
            data: combinedSeriesData.right,
          },
          {
            name: "Left",
            data: combinedSeriesData.left,
          },
          // No Total series when tankLocation is provided
        ],
      }));

      // Calculate grand total
      grandTotal += combinedWeeklyVolumes.right.reduce(
        (acc, curr) => acc + parseFloat(curr),
        0
      );
      grandTotal += combinedWeeklyVolumes.left.reduce(
        (acc, curr) => acc + parseFloat(curr),
        0
      );
    } else {
      // tankLocation is not provided, include Total series
      const combinedWeeklyVolumes = {
        right: right ? calculateWeeklyVolumes(right) : [],
        left: left ? calculateWeeklyVolumes(left) : [],
      };

      const combinedSeriesData = {
        right: right
          ? combinedWeeklyVolumes.right.map((volume, index) => ({
              x: `Week ${index + 1}`,
              y: parseFloat(volume),
            }))
          : [],
        left: left
          ? combinedWeeklyVolumes.left.map((volume, index) => ({
              x: `Week ${index + 1}`,
              y: parseFloat(volume),
            }))
          : [],
      };

      setState((prevState) => ({
        ...prevState,
        series: [
          {
            name: "Right",
            data: combinedSeriesData.right,
          },
          {
            name: "Left",
            data: combinedSeriesData.left,
          },
          {
            name: "Total",
            data: combinedWeeklyVolumes.right.map((rightVolume, index) => ({
              x: `Week ${index + 1}`,
              y:
                (parseFloat(rightVolume) || 0) +
                (parseFloat(combinedWeeklyVolumes.left[index]) || 0),
            })),
          },
          ...prevState.series.slice(3), // Keep other series unchanged
        ],
      }));

      // Calculate grand total
      grandTotal += combinedWeeklyVolumes.right.reduce(
        (acc, curr) => acc + parseFloat(curr),
        0
      );
      grandTotal += combinedWeeklyVolumes.left.reduce(
        (acc, curr) => acc + parseFloat(curr),
        0
      );
    }

    setGrandTotalVolume(grandTotal);
  }, [right, left, tankLocation]);

  // ========================= checking data
  useEffect(() => {
    console.log("Right Data:", rightCCSTotal);
    console.log("Left Data:", leftCCSTotal);
    console.log("Tank Location: ", tankLocation);
  }, [right, left, tankLocation]);

  return (
    <div className="head">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type={type}
        height={height}
      />

      {/* Conditionally render total text or 'No data for this date' */}
      <p className="text">
        {grandTotalVolume === 0
          ? "No records found for this date."
          : `Total: ${formatter.format(
              Math.round(grandTotalVolume * 100) / 100
            )} L`}
      </p>
      {/* End of additional data */}
    </div>
  );
};

export default MonthlyChart;

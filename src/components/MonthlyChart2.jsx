import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const MonthlyChart2 = ({
  colors,
  height,
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
      {
        name: "Dorm",
        data: [],
      },
      {
        name: "CCS",
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

  // ========================= checking data
  useEffect(() => {
    console.log("Right Data:", rightCCSTotal);
    console.log("Left Data:", leftCCSTotal);
    console.log("Tank Location: ", tankLocation);
  }, [rightCCSTotal, leftCCSTotal, tankLocation]);

  // ========================== total chart
  // Function to calculate total volumes by week for CCS
  const calculateTotalVolumesCCS = (rightCCS, leftCCS) => {
    const totalVolumesCCS = Array.from({ length: 4 }, () => 0); // Assuming 4 weeks
    [rightCCS, leftCCS].forEach((data) => {
      Object.values(data).forEach((week, index) => {
        week.entries.forEach((dateEntry) => {
          dateEntry.entries.forEach((entry) => {
            totalVolumesCCS[index] += parseFloat(entry.volume);
          });
        });
      });
    });
    return totalVolumesCCS.map((total) => total.toFixed(2));
  };

  // Function to calculate total volumes by week for Dorm
  const calculateTotalVolumesDorm = (rightDorm, leftDorm) => {
    const totalVolumesDorm = Array.from({ length: 4 }, () => 0); // Assuming 4 weeks
    [rightDorm, leftDorm].forEach((data) => {
      Object.values(data).forEach((week, index) => {
        week.entries.forEach((dateEntry) => {
          dateEntry.entries.forEach((entry) => {
            totalVolumesDorm[index] += parseFloat(entry.volume);
          });
        });
      });
    });
    return totalVolumesDorm.map((total) => total.toFixed(2));
  };

  useEffect(() => {
    let grandTotal = 0;
    let seriesData = [];

    if (tankLocation === "Total") {
      // Calculate total volumes for CCS
      const totalVolumesCCS = calculateTotalVolumesCCS(
        rightCCSTotal,
        leftCCSTotal
      );

      // Calculate total volumes for Dorm
      const totalVolumesDorm = calculateTotalVolumesDorm(
        rightDormTotal,
        leftDormTotal
      );

      // Display total volume across all locations
      seriesData = [
        {
          name: "CCS",
          data: totalVolumesCCS.map((volume, index) => ({
            x: `Week ${index + 1}`,
            y: parseFloat(volume),
          })),
        },
        {
          name: "Dorm",
          data: totalVolumesDorm.map((volume, index) => ({
            x: `Week ${index + 1}`,
            y: parseFloat(volume),
          })),
        },
      ];

      // Calculate grand total
      grandTotal =
        totalVolumesCCS.reduce((acc, curr) => acc + parseFloat(curr), 0) +
        totalVolumesDorm.reduce((acc, curr) => acc + parseFloat(curr), 0);
    }

    setState((prevState) => ({
      ...prevState,
      series: seriesData,
    }));

    setGrandTotalVolume(grandTotal);
  }, [
    rightCCSTotal,
    leftCCSTotal,
    rightDormTotal,
    leftDormTotal,
    tankLocation,
  ]);

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

export default MonthlyChart2;

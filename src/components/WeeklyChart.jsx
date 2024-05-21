import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const WeeklyChart = ({
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
        size: 5,
        hover: {
          size: 8,
        },
      },
      xaxis: {
        type: "category", // Changed from datetime to category
        categories: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"], // Define the categories (days of the week)
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

  // ========== working tank location
  useEffect(() => {
    if (right && left) {
      let tankData;
      let grandTotalVolume = 0;
      if (tankLocation) {
        // Adjusted condition to include 'CCSRight'
        if (tankLocation === "DormRight" || tankLocation === "CCSRight") {
          tankData = right;
        } else if (tankLocation === "DormLeft" || tankLocation === "CCSLeft") {
          tankData = left;
        }
        
        const tankVolumes = Object.values(tankData).map((tankEntry) => {
          const volume =
            tankEntry.entries.length > 0
              ? parseFloat(tankEntry.entries[0].volume)
              : 0;
          if (!isNaN(volume)) {
            grandTotalVolume += volume; // Add volume to grand total if it's a valid number
          }
          return volume;
        });

        setState((prevState) => ({
          ...prevState,
          series: [
            {
              ...prevState.series[0],
              data:
                tankLocation === "DormRight" || tankLocation === "CCSRight"
                  ? tankVolumes
                  : [],
            },
            {
              ...prevState.series[1],
              data:
                tankLocation === "DormLeft" || tankLocation === "CCSLeft"
                  ? tankVolumes
                  : [],
            },
            {
              ...prevState.series[2],
              data: [],
            },
          ],
        }));
      } else {
        const totalVolumes = Object.values(right).map((rightEntry, index) => {
          const totalRightVolume =
            rightEntry.entries.length > 0 ? rightEntry.entries[0].volume : 0;
          const totalLeftVolume =
            left[index]?.entries.length > 0 ? left[index].entries[0].volume : 0;
          const totalVolume = (totalRightVolume + totalLeftVolume).toFixed(2);
          grandTotalVolume += parseFloat(totalVolume); // Add total volume to grand total
          return totalVolume;
        });

        setState((prevState) => ({
          ...prevState,
          series: [
            {
              ...prevState.series[0],
              data: Object.values(right).map((rightEntry) =>
                (rightEntry.entries.length > 0
                  ? rightEntry.entries[0].volume
                  : 0
                ).toFixed(2)
              ),
            },
            {
              ...prevState.series[1],
              data: Object.values(left).map((leftEntry) =>
                (leftEntry.entries.length > 0
                  ? leftEntry.entries[0].volume
                  : 0
                ).toFixed(2)
              ),
            },
            {
              ...prevState.series[2],
              data: totalVolumes,
            },
          ],
        }));
      }
      // Update grand total volume state
      setGrandTotalVolume(grandTotalVolume);
      console.log(`Grand Total Volume: ${grandTotalVolume.toFixed(2)}`);
    }
  }, [right, left, tankLocation]);

  // =================checking data
  useEffect(() => {
    console.log("Right Data:", rightCCSTotal);
    console.log("Left Data:", leftCCSTotal);
    console.log("Tank Location: ", tankLocation);
  }, [right, left, tankLocation]);

  useEffect(() => {
    if (right || rightDormTotal || rightCCSTotal) {
      const dates = [];
      if (rightCCSTotal)
        dates.push(...Object.values(rightCCSTotal).map((item) => item.date));
      else if (rightDormTotal)
        dates.push(...Object.values(rightDormTotal).map((item) => item.date));
      else if (right)
        dates.push(...Object.values(right).map((item) => item.date));
      setDates(dates);
    }
  }, [right, rightDormTotal, rightCCSTotal]);

  // ======================== total chart

  useEffect(() => {
    if (rightDormTotal && leftDormTotal && rightCCSTotal && leftCCSTotal) {
      const rightVolumes = Object.values(rightDormTotal).map((rightEntry) =>
        (rightEntry.entries.length > 0
          ? rightEntry.entries[0].volume
          : 0
        ).toFixed(2)
      );

      const leftVolumes = Object.values(leftDormTotal).map((leftEntry) =>
        (leftEntry.entries.length > 0
          ? leftEntry.entries[0].volume
          : 0
        ).toFixed(2)
      );

      const totalVolumes = Object.keys(rightDormTotal).map((key, index) => {
        const totalRightVolume =
          rightDormTotal[key].entries.length > 0
            ? rightDormTotal[key].entries[0].volume
            : 0;
        const totalLeftVolume =
          leftDormTotal[key]?.entries.length > 0
            ? leftDormTotal[key].entries[0].volume
            : 0;
        return (totalRightVolume + totalLeftVolume).toFixed(2);
      });

      const totalVolume = totalVolumes
        .reduce((acc, curr) => parseFloat(acc) + parseFloat(curr), 0)
        .toFixed(2);

      const rightCCSVolumes = Object.values(rightCCSTotal).map(
        (rightCcsEntry) =>
          (rightCcsEntry.entries.length > 0
            ? rightCcsEntry.entries[0].volume
            : 0
          ).toFixed(2)
      );

      const leftCCSVolumes = Object.values(leftCCSTotal).map((leftCcsEntry) =>
        (leftCcsEntry.entries.length > 0
          ? leftCcsEntry.entries[0].volume
          : 0
        ).toFixed(2)
      );

      const totalCCSVolumes = Object.keys(rightCCSTotal).map((key, index) => {
        const totalRightCcsVolume =
          rightCCSTotal[key].entries.length > 0
            ? rightCCSTotal[key].entries[0].volume
            : 0;
        const totalLeftCcsVolume =
          leftCCSTotal[key]?.entries.length > 0
            ? leftCCSTotal[key].entries[0].volume
            : 0;
        return (totalRightCcsVolume + totalLeftCcsVolume).toFixed(2);
      });

      const totalCCSVolume = totalCCSVolumes
        .reduce((acc, curr) => parseFloat(acc) + parseFloat(curr), 0)
        .toFixed(2);

      // Calculate grand total volume across all locations and both locations
      const grandTotalVolume =
        parseFloat(totalVolume) + parseFloat(totalCCSVolume);

      setGrandTotalVolume(grandTotalVolume);

      setState((prevState) => ({
        ...prevState,
        series:
          tankLocation !== "Total"
            ? [
                {
                  ...prevState.series[0],
                  data: rightCCSVolumes,
                },
                {
                  ...prevState.series[1],
                  data: leftCCSVolumes,
                },
                {
                  ...prevState.series[2],
                  data: totalCCSVolumes,
                },
                {
                  ...prevState.series[3],
                  data: rightVolumes,
                },
                {
                  ...prevState.series[4],
                  data: leftVolumes,
                },
                {
                  ...prevState.series[5],
                  data: totalVolumes,
                },
              ]
            : [
                {
                  ...prevState.series[3],
                  name: "CCS",
                  data: totalCCSVolumes,
                },
                {
                  ...prevState.series[4],
                  name: "Dorm",
                  data: totalVolumes,
                },
              ],
      }));
      // Display total volume
      console.log(`Grand Total Volume: ${grandTotalVolume.toFixed(2)}`);
    }
  }, [rightDormTotal, leftDormTotal, rightCCSTotal, leftCCSTotal]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

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
    </div>
  );
};

export default WeeklyChart;

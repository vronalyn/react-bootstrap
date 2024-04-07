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
            fontSize: "10px", // Adjust the font size here
          },
          formatter: function (value) {
            return value.toFixed(2); // Format volume to two decimal points
          },
        },
      },
      legend: {
        position: "top",
      },
      tooltip: {
        x: {},
      },
      grid: {
        borderColor: "#f0f0f0",
      },
    },
  });

  useEffect(() => {
    console.log("Right Data:", right);
    console.log("Left Data:", left);
  }, [right, left]);

  return (
    <div className="head">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type={type}
        height={height}
      />

      {/* extra data */}
      {/* <p>
        Total:{" "}
        {grandTotalVolume.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </p> */}

      {/* extra data */}
    </div>
  );
};

export default MonthlyChart;

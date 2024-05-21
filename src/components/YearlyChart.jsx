import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const YearlyChart = ({
  height,
  // dateRange,
  type,
  tankLocation,
  data,
}) => {
  const [dates, setDates] = useState([]);
  const [totalVolumes, setTotalVolumes] = useState([]);
  const [grandTotalVolume, setGrandTotalVolume] = useState(0);
  const [state, setState] = useState({
    series: [
      {
        name: "Total",
        data: [],
      },
    ],
    options: {
      chart: {
        type: `${type}`,
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
        type: "category",
        categories: [
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
        ],
        labels: {
          style: {
            fontSize: "12px",
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
            return value.toFixed(2);
          },
        },
      },
      legend: {
        position: "top",
        show: true,
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

  //   ===================================================== total chart

  useEffect(() => {
    if (tankLocation === "Total") {
      const monthlyVolumes = Object.keys(data).map((month) => data[month]);
      const totalVolume = monthlyVolumes.reduce(
        (acc, volume) => acc + volume,
        0
      );
      setGrandTotalVolume(totalVolume);

      setState((prevState) => ({
        ...prevState,
        series: [
          {
            ...prevState.series[0],
            name: "Total",
            data: monthlyVolumes,
          },
        ],
      }));
    }
  }, [data, tankLocation]);

  return (
    <div className="head">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type={type}
        height={height}
      />
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

export default YearlyChart;

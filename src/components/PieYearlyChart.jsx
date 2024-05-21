import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieYearlyChart = ({
  height,
  type,
  tankLocation,
  data,
}) => {
  const [grandTotalVolume, setGrandTotalVolume] = useState(0);
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        type: "pie", // Changed type to pie
        height: height,
      },
      labels: [],
      legend: {
        position: "top",
        show: true,
      },
      tooltip: {
        style: {
          fontSize: "14px",
        },
      },
    },
  });

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

  useEffect(() => {
    if (tankLocation === "Total") {
      const monthlyVolumes = Object.keys(data).map((month) => data[month]);
      const totalVolume = monthlyVolumes.reduce(
        (acc, volume) => acc + volume,
        0
      );
      setGrandTotalVolume(totalVolume);

      setState({
        series: monthlyVolumes,
        options: {
          ...state.options,
          labels: Object.keys(data),
        },
      });
    }
  }, [data, tankLocation, state.options]);

  return (
    <div className="head">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type={type}
        height={height}
      />
      <p className="text p-4">
        {grandTotalVolume === 0
          ? "No records found for this date."
          : `Total: ${formatter.format(
              Math.round(grandTotalVolume * 100) / 100
            )} L`}
      </p>
    </div>
  );
};

export default PieYearlyChart;

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieMonthlyChart = ({
  height,
  rightCCSTotal,
  leftCCSTotal,
  rightDormTotal,
  leftDormTotal,
}) => {
  const [grandTotalVolume, setGrandTotalVolume] = useState(0);
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
        height: height,
      },
      labels: [],
      legend: {
        position: "top",
      },
      dataLabels: {
        style: {
          fontSize: "18px",
        },

        offsetX: 20,
        offsetY: 0,
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "18px",
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: true,
        },
      },
    },
  });

  useEffect(() => {
    let seriesData = [];
    let labels = [];

    // Calculate total volumes for CCS
    const totalCCS = calculateTotalVolumes(rightCCSTotal, leftCCSTotal);
    seriesData.push(
      parseFloat(totalCCS.reduce((acc, curr) => acc + curr, 0).toFixed(2))
    );
    labels.push("CCS");

    // Calculate total volumes for Dorm
    const totalDorm = calculateTotalVolumes(rightDormTotal, leftDormTotal);
    seriesData.push(
      parseFloat(totalDorm.reduce((acc, curr) => acc + curr, 0).toFixed(2))
    );
    labels.push("Dorm");

    setState((prevState) => ({
      ...prevState,
      series: seriesData,
      options: {
        ...prevState.options,
        labels: labels,
      },
    }));

    setGrandTotalVolume(seriesData.reduce((acc, curr) => acc + curr, 0));
  }, [rightCCSTotal, leftCCSTotal, rightDormTotal, leftDormTotal]);

  const calculateTotalVolumes = (right, left) => {
    const totalVolumes = [];

    [right, left].forEach((data) => {
      Object.values(data).forEach((week) => {
        week.entries.forEach((dateEntry) => {
          dateEntry.entries.forEach((entry) => {
            totalVolumes.push(parseFloat(entry.volume));
          });
        });
      });
    });

    return totalVolumes;
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

  return (
    <div className="head">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="pie"
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

export default PieMonthlyChart;

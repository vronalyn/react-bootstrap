import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const RealtimeChart = ({
  height,
  rightCCS,
  leftCCS,
  rightDorm,
  leftDorm,
  type,
}) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "CCS",
        data: [],
      },
      {
        name: "Dorm",
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
        hover: {
          size: 8,
        },
      },
      xaxis: {
        type: "category",
        categories: [],
        labels: {
          style: {
            fontSize: "8px", // Adjust the font size here
          },
        },
      },
      yaxis: {
        title: {
          text: "Volume",
        },
        min: 0,
        opposite: false,
        labels: {
          formatter: function (value) {
            return value.toFixed(2);
          },
        },
      },
      legend: {
        position: "top",
      },
      grid: {
        borderColor: "#f0f0f0",
      },
    },
    combinedLastIndexTotal: 0,
  });

  useEffect(() => {
    const maxLength = Math.max(
      rightCCS.length,
      leftCCS.length,
      rightDorm.length,
      leftDorm.length
    );

    const categories = Array.from({ length: maxLength }, (_, i) => ` ${i}`);
    const totalVolumeCCS = Array.from({ length: maxLength }, () => 0);
    const totalVolumeDorm = Array.from({ length: maxLength }, () => 0);

    for (let i = 0; i < maxLength; i++) {
      totalVolumeCCS[i] = (
        (rightCCS[i]?.volume ?? 0) + (leftCCS[i]?.volume ?? 0)
      ).toFixed(2);
      totalVolumeDorm[i] = (
        (rightDorm[i]?.volume ?? 0) + (leftDorm[i]?.volume ?? 0)
      ).toFixed(2);
    }

    // Sort totalVolume arrays in descending order
    // totalVolumeCCS.sort((a, b) => b - a);
    // totalVolumeDorm.sort((a, b) => b - a);

    // Sort totalVolume arrays in ascending order
    totalVolumeCCS.sort((a, b) => a - b);
    totalVolumeDorm.sort((a, b) => a - b);

    const lastIndexTotalCCS = totalVolumeCCS[totalVolumeCCS.length - 1];
    const lastIndexTotalDorm = totalVolumeDorm[totalVolumeDorm.length - 1];
    const combinedLastIndexTotal = (
      parseFloat(lastIndexTotalCCS) + parseFloat(lastIndexTotalDorm)
    ).toFixed(2);

    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [
        { name: "CCS", data: totalVolumeCCS },
        { name: "Dorm", data: totalVolumeDorm },
      ],
      options: {
        ...prevChartData.options,
        xaxis: {
          ...prevChartData.options.xaxis,
          categories,
        },
      },
      combinedLastIndexTotal,
    }));
  }, [rightCCS, leftCCS, rightDorm, leftDorm]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

  return (
    <div className="head">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type={type}
        height={height}
      />

      <div className="card-meta">
        <p className="text">
          Total: {formatter.format(chartData.combinedLastIndexTotal)}
        </p>
      </div>
    </div>
  );
};

export default RealtimeChart;

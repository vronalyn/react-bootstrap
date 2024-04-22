import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const HourlyChart = ({
  colors,
  height,
  right,
  left,
  tankLocation,
  rightCCSTotal,
  leftCCSTotal,
  rightDormTotal,
  leftDormTotal,
  type,
}) => {
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
        data: [], // Total volume data will be added here
      },
    ],
    options: {
      chart: {
        type: `${type}`,
        height: `${height}`,
        // maxHeight: "600px",
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
        title: {
          text: "Time",
        },
        // categories: Object.keys(right).map((hourRange) => {
        //   const [start, end] = hourRange.split("-");
        //   return `${new Date(start).toLocaleString("en-US", {
        //     hour: "numeric",
        //     hour12: true,
        //   })}-${new Date(end).toLocaleString("en-US", {
        //     hour: "numeric",
        //     hour12: true,
        //   })}`;
        // }), // Format each hour range as 1AM-2AM
        categories: [
          "8AM-9AM",
          "9AM-10AM",
          "10AM-11AM",
          "11AM-12PM",
          "12PM-1PM",
          "1PM-2PM",
          "2PM-3PM",
          "3PM-4PM",
          "4PM-5PM",
          "5PM-6PM",
          "6PM-7PM",
          "7PM-8PM",
          "8PM-9PM",
          "9PM-10PM",
          "10PM-11PM",
          "11PM-12AM",
          "12AM-1AM",
          "1AM-2AM",
          "2AM-3AM",
          "3AM-4AM",
          "4AM-5AM",
          "5AM-6AM",
          "6AM-7AM",
          "7AM-8AM",
        ],
        labels: {
          style: {
            fontSize: "10px", // Adjust the font size here
          },
        },
      },
      yaxis: {
        title: {
          text: "Volume",
        },
        opposite: false,
        // labels: {
        //   formatter: function (value) {
        //     return parseInt(value);
        //   },
        // },
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
      // colors: ["#ACE1AF", "#FBEC5D", "#FFbf00"],
      // colors: ["#2D4B8A", "#3C63C6", "#FFC100"],
    },
  });

  // useEffect(() => {
  //   const rightVolumes = Object.values(right).map((data) =>
  //     data.reduce((acc, curr) => acc + curr.volume, 0)
  //   );
  //   const leftVolumes = Object.values(left).map((data) =>
  //     data.reduce((acc, curr) => acc + curr.volume, 0)
  //   );
  //   setState((prevState) => ({
  //     ...prevState,
  //     series: [
  //       {
  //         ...prevState.series[0],
  //         data: rightVolumes,
  //       },
  //       {
  //         ...prevState.series[1],
  //         data: leftVolumes,
  //       },
  //     ],
  //   }));
  // }, [right, left]);

  // useEffect(() => {
  //   // Calculate total volume for each hour range
  //   const totalVolumes = Object.keys(right).map((hourRange, index) => {
  //     const totalRightVolume = right[hourRange].reduce(
  //       (acc, curr) => acc + curr.volume,
  //       0
  //     );
  //     const totalLeftVolume = left[hourRange].reduce(
  //       (acc, curr) => acc + curr.volume,
  //       0
  //     );
  //     return totalRightVolume + totalLeftVolume;
  //   });

  //   setState((prevState) => ({
  //     ...prevState,
  //     series: [
  //       {
  //         ...prevState.series[0],
  //         data: Object.values(right).map((data) =>
  //           data.reduce((acc, curr) => acc + curr.volume, 0)
  //         ),
  //       },
  //       {
  //         ...prevState.series[1],
  //         data: Object.values(left).map((data) =>
  //           data.reduce((acc, curr) => acc + curr.volume, 0)
  //         ),
  //       },
  //       {
  //         ...prevState.series[2],
  //         data: totalVolumes,
  //       },
  //     ],
  //   }));
  // }, [right, left]);

  // useEffect(() => {
  //   if (right && left) {
  //     // Calculate total volume for each hour range
  //     const totalVolumes = Object.keys(right).map((hourRange, index) => {
  //       const totalRightVolume = right[hourRange]?.reduce(
  //         (acc, curr) => acc + curr.volume,
  //         0
  //       );
  //       const totalLeftVolume = left[hourRange]?.reduce(
  //         (acc, curr) => acc + curr.volume,
  //         0
  //       );
  //       return (totalRightVolume || 0) + (totalLeftVolume || 0);
  //     });

  //     setState((prevState) => ({
  //       ...prevState,
  //       series: [
  //         {
  //           ...prevState.series[0],
  //           data: Object.values(right).map((data) =>
  //             (data || []).reduce((acc, curr) => acc + curr.volume, 0)
  //           ),
  //         },
  //         {
  //           ...prevState.series[1],
  //           data: Object.values(left).map((data) =>
  //             (data || []).reduce((acc, curr) => acc + curr.volume, 0)
  //           ),
  //         },
  //         {
  //           ...prevState.series[2],
  //           data: totalVolumes,
  //         },
  //       ],
  //     }));
  //   }
  // }, [right, left]);

  useEffect(() => {
    if (right && left) {
      // Calculate total volume for each hour range
      const totalVolumes = Object.keys(right).map((hourRange, index) => {
        const totalRightVolume = right[hourRange]?.reduce(
          (acc, curr) => acc + curr.volume,
          0
        );
        const totalLeftVolume = left[hourRange]?.reduce(
          (acc, curr) => acc + curr.volume,
          0
        );
        return (totalRightVolume || 0) + (totalLeftVolume || 0);
      });

      setState((prevState) => ({
        ...prevState,
        series: [
          {
            ...prevState.series[0],
            data: Object.values(right).map((data) =>
              (data || [])
                .reduce((acc, curr) => acc + curr.volume, 0)
                .toFixed(2)
            ),
          },
          {
            ...prevState.series[1],
            data: Object.values(left).map((data) =>
              (data || [])
                .reduce((acc, curr) => acc + curr.volume, 0)
                .toFixed(2)
            ),
          },
          {
            ...prevState.series[2],
            data: totalVolumes.map((volume) => volume.toFixed(2)),
          },
        ],
      }));
    }
  }, [right, left]);

  useEffect(() => {
    console.log("Right Data:", right);
    console.log("Left Data:", left);
  }, [right, left]);

  // useEffect(() => {
  //   if (state.series[2].data.length > 0) {
  //     // Find the last entry with total volume greater than 0
  //     let lastIndex = state.series[2].data.length - 1;
  //     while (
  //       lastIndex >= 0 &&
  //       parseFloat(state.series[2].data[lastIndex]) <= 0
  //     ) {
  //       lastIndex--;
  //     }
  //     // Set the grand total volume
  //     if (lastIndex >= 0) {
  //       setGrandTotalVolume(parseFloat(state.series[2].data[lastIndex]));
  //     } else {
  //       setGrandTotalVolume(0);
  //     }
  //   } else {
  //     setGrandTotalVolume(0);
  //   }
  // }, [state.series[2].data]);

  useEffect(() => {
    if (right && left) {
      // Get the last entry for each location with volume greater than 0
      const rightLastEntry = Object.values(right).findLast(
        (data) => data && data.length > 0 && data[data.length - 1].volume > 0
      );
      const leftLastEntry = Object.values(left).findLast(
        (data) => data && data.length > 0 && data[data.length - 1].volume > 0
      );

      // Calculate grand total volume
      const grandTotal =
        (rightLastEntry
          ? rightLastEntry[rightLastEntry.length - 1].volume
          : 0) +
        (leftLastEntry ? leftLastEntry[leftLastEntry.length - 1].volume : 0);

      // Update state with the grand total volume
      setGrandTotalVolume(grandTotal);
    } else {
      setGrandTotalVolume(0);
    }
  }, [right, left]);

  // ================================================================total chart
  useEffect(() => {
    if (rightDormTotal && leftDormTotal && rightCCSTotal && leftCCSTotal) {
      if (tankLocation === "Total") {
        // Calculate total volume for Dorm and CCS separately
        const totalDormVolumes = Object.keys(rightDormTotal).map(
          (hourRange, index) => {
            const totalRightDormVolume = (
              rightDormTotal[hourRange] || []
            ).reduce((acc, curr) => acc + curr.volume, 0);
            const totalLeftDormVolume = (leftDormTotal[hourRange] || []).reduce(
              (acc, curr) => acc + curr.volume,
              0
            );
            return totalRightDormVolume + totalLeftDormVolume;
          }
        );

        const totalCCSVolumes = Object.keys(rightCCSTotal).map(
          (hourRange, index) => {
            const totalRightCCSVolume = (rightCCSTotal[hourRange] || []).reduce(
              (acc, curr) => acc + curr.volume,
              0
            );
            const totalLeftCCSVolume = (leftCCSTotal[hourRange] || []).reduce(
              (acc, curr) => acc + curr.volume,
              0
            );
            return totalRightCCSVolume + totalLeftCCSVolume;
          }
        );

        setState((prevState) => ({
          ...prevState,
          series: [
            {
              name: "CCS",
              data: totalCCSVolumes.map((volume) => volume.toFixed(2)),
            },
            {
              name: "Dorm",
              data: totalDormVolumes.map((volume) => volume.toFixed(2)),
            },
          ],
        }));
      } else {
        // Calculate total volume for each hour range for CCS and Dorm combined
        const totalVolumes = Object.keys(rightDormTotal).map(
          (hourRange, index) => {
            const totalRightVolume = (rightDormTotal[hourRange] || []).reduce(
              (acc, curr) => acc + curr.volume,
              0
            );
            const totalLeftVolume = (leftDormTotal[hourRange] || []).reduce(
              (acc, curr) => acc + curr.volume,
              0
            );
            return totalRightVolume + totalLeftVolume;
          }
        );

        setState((prevState) => ({
          ...prevState,
          series: [
            {
              name: "Right",
              data: Object.values(rightCCSTotal).map((data) =>
                (data || [])
                  .reduce((acc, curr) => acc + curr.volume, 0)
                  .toFixed(2)
              ),
            },
            {
              name: "Left",
              data: Object.values(leftCCSTotal).map((data) =>
                (data || [])
                  .reduce((acc, curr) => acc + curr.volume, 0)
                  .toFixed(2)
              ),
            },
            {
              name: "Total",
              data: totalVolumes.map((volume) => volume.toFixed(2)),
            },
          ],
        }));
      }
    }
  }, [
    rightDormTotal,
    leftDormTotal,
    rightCCSTotal,
    leftCCSTotal,
    tankLocation,
  ]);

  // useEffect(() => {
  //   if (rightDormTotal && leftDormTotal && rightCCSTotal && leftCCSTotal) {
  //     // Calculate grand total for Dorm and CCS combined
  //     const grandTotalCCS =
  //       Object.values(rightCCSTotal).reduce(
  //         (acc, data) =>
  //           acc + (data || []).reduce((acc, curr) => acc + curr.volume, 0),
  //         0
  //       ) +
  //       Object.values(leftCCSTotal).reduce(
  //         (acc, data) =>
  //           acc + (data || []).reduce((acc, curr) => acc + curr.volume, 0),
  //         0
  //       );

  //     const grandTotalDorm =
  //       Object.values(rightDormTotal).reduce(
  //         (acc, data) =>
  //           acc + (data || []).reduce((acc, curr) => acc + curr.volume, 0),
  //         0
  //       ) +
  //       Object.values(leftDormTotal).reduce(
  //         (acc, data) =>
  //           acc + (data || []).reduce((acc, curr) => acc + curr.volume, 0),
  //         0
  //       );

  //     // Calculate grand total by adding CCS and Dorm volumes
  //     const grandTotal = grandTotalCCS + grandTotalDorm;

  //     // Update state with the grand total volume
  //     setGrandTotalVolume(grandTotal);
  //   } else {
  //     setGrandTotalVolume(0);
  //   }
  // }, [rightDormTotal, leftDormTotal, rightCCSTotal, leftCCSTotal]);

  useEffect(() => {
    if (rightDormTotal && leftDormTotal && rightCCSTotal && leftCCSTotal) {
      // Get the last entry data for each location with volume greater than 0
      const getLastEntryVolume = (data) => {
        const lastEntry = Object.values(data).findLast(
          (hourRangeData) =>
            hourRangeData &&
            hourRangeData.length > 0 &&
            hourRangeData[hourRangeData.length - 1].volume > 0
        );
        return lastEntry ? lastEntry[lastEntry.length - 1].volume : 0;
      };

      // Get last entry volumes for each location
      const rightCCSLastVolume = getLastEntryVolume(rightCCSTotal);
      const leftCCSLastVolume = getLastEntryVolume(leftCCSTotal);
      const rightDormLastVolume = getLastEntryVolume(rightDormTotal);
      const leftDormLastVolume = getLastEntryVolume(leftDormTotal);

      // Format volumes before summing up
      const formattedRightCCSLastVolume =
        rightCCSLastVolume !== undefined ? rightCCSLastVolume.toFixed(2) : 0;
      const formattedLeftCCSLastVolume =
        leftCCSLastVolume !== undefined ? leftCCSLastVolume.toFixed(2) : 0;
      const formattedRightDormLastVolume =
        rightDormLastVolume !== undefined ? rightDormLastVolume.toFixed(2) : 0;
      const formattedLeftDormLastVolume =
        leftDormLastVolume !== undefined ? leftDormLastVolume.toFixed(2) : 0;

      // Calculate grand total by summing formatted last entry volumes
      const grandTotal =
        parseFloat(formattedRightCCSLastVolume) +
        parseFloat(formattedLeftCCSLastVolume) +
        parseFloat(formattedRightDormLastVolume) +
        parseFloat(formattedLeftDormLastVolume);

      console.log(
        "Formatted volumes:",
        formattedRightCCSLastVolume,
        formattedLeftCCSLastVolume,
        formattedRightDormLastVolume,
        formattedLeftDormLastVolume
      );

      // Update state with the grand total volume
      setGrandTotalVolume(grandTotal);
    } else {
      setGrandTotalVolume(0);
    }
  }, [rightDormTotal, leftDormTotal, rightCCSTotal, leftCCSTotal]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
  });

  return (
    <div className="head">
      {/* <p className="header">{header}</p>
      <p className="reminder">
        Please be advised that data collection for the selected date begins at
        8AM and concludes at 8AM the following day.
      </p> */}
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

      {/* <p className="text">Total: {formatter.format(grandTotalVolume)}</p> */}

      {/* <p className="text">
        Total: {formatter.format(Math.round(grandTotalVolume * 100) / 100)}
      </p> */}
      <p className="text">
        {grandTotalVolume === 0
          ? "No records found for this date."
          : `Total: ${formatter.format(
              Math.round(grandTotalVolume * 100) / 100
            )} L`}
      </p>
      {/* extra data */}
    </div>
  );
};

export default HourlyChart;

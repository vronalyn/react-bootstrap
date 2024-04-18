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
      // {
      //   name: "Dorm",
      //   data: [],
      // },
      // {
      //   name: "CCS",
      //   data: [],
      // },
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
        x: {},
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

  // ====================================== TypeError: Cannot read properties of undefined (reading 'y')
  // useEffect(() => {
  //   let grandTotal = 0;

  //   // Check if tankLocation is not provided
  //   if (!tankLocation) {
  //     const combinedWeeklyVolumes = {
  //       right: right ? calculateWeeklyVolumes(right) : [],
  //       left: left ? calculateWeeklyVolumes(left) : [],
  //     };

  //     const combinedSeriesData = {
  //       right: right
  //         ? combinedWeeklyVolumes.right.map((volume, index) => ({
  //             x: `Week ${index + 1}`,
  //             y: parseFloat(volume),
  //           }))
  //         : [],
  //       left: left
  //         ? combinedWeeklyVolumes.left.map((volume, index) => ({
  //             x: `Week ${index + 1}`,
  //             y: parseFloat(volume),
  //           }))
  //         : [],
  //     };

  //     setState((prevState) => ({
  //       ...prevState,
  //       series: [
  //         {
  //           name: "Right",
  //           data: combinedSeriesData.right,
  //         },
  //         {
  //           name: "Left",
  //           data: combinedSeriesData.left,
  //         },
  //         {
  //           name: "Total",
  //           data: combinedWeeklyVolumes.right.map((rightVolume, index) => ({
  //             x: `Week ${index + 1}`,
  //             y:
  //               (parseFloat(rightVolume) || 0) +
  //               (parseFloat(combinedWeeklyVolumes.left[index]) || 0),
  //           })),
  //         },
  //         ...prevState.series.slice(3), // Keep other series unchanged
  //       ],
  //     }));

  //     grandTotal += combinedWeeklyVolumes.right.reduce(
  //       (acc, curr) => acc + parseFloat(curr),
  //       0
  //     );
  //     grandTotal += combinedWeeklyVolumes.left.reduce(
  //       (acc, curr) => acc + parseFloat(curr),
  //       0
  //     );
  //   } else {
  //     let tankData;
  //     let grandTotalVolume = 0;
  //     if (tankLocation) {
  //       if (tankLocation === "DormRight" || tankLocation === "CCSRight") {
  //         tankData = right;
  //       } else if (tankLocation === "DormLeft" || tankLocation === "CCSLeft") {
  //         tankData = left;
  //       }
  //     }

  //     const weeklyVolumes = calculateWeeklyVolumes(tankData);

  //     const seriesData = {
  //       right: [],
  //       left: [],
  //     };

  //     // Determine which series to populate based on tankLocation
  //     const targetSeries =
  //       tankLocation === "DormRight" || tankLocation === "CCSRight"
  //         ? "right"
  //         : "left";

  //     for (let i = 0; i < weeklyVolumes.length; i++) {
  //       const weekNumber = i + 1;
  //       seriesData[targetSeries].push({
  //         x: `Week ${weekNumber}`,
  //         y: parseFloat(weeklyVolumes[i]),
  //       });
  //     }

  //     // Pad seriesData.right and seriesData.left to ensure they have the same length
  //     const maxLength = Math.max(
  //       seriesData.right.length,
  //       seriesData.left.length
  //     );
  //     seriesData.right.length = maxLength;
  //     seriesData.left.length = maxLength;

  //     // Update state with the series data
  //     setState((prevState) => ({
  //       ...prevState,
  //       series: [
  //         {
  //           name: "Right",
  //           data: seriesData.right.map((data) => data || { x: "", y: 0 }), // Pad with default object if undefined
  //         },
  //         {
  //           name: "Left",
  //           data: seriesData.left.map((data) => data || { x: "", y: 0 }), // Pad with default object if undefined
  //         },
  //         {
  //           name: "Total",
  //           data: seriesData.right.map((rightVolume, index) => ({
  //             x: `Week ${index + 1}`,
  //             y:
  //               parseFloat(rightVolume.y) +
  //               parseFloat(seriesData.left[index].y),
  //           })),
  //         },
  //         ...prevState.series.slice(3), // Keep other series unchanged
  //       ],
  //     }));

  //     // Calculate grand total volume
  //     grandTotalVolume += weeklyVolumes.reduce(
  //       (acc, curr) => acc + parseFloat(curr),
  //       0
  //     );
  //     setGrandTotalVolume(grandTotalVolume);
  //   }
  // }, [right, left, tankLocation]);

  useEffect(() => {
    let grandTotal = 0;

    // Check if tankLocation is not provided
    if (right && left) {
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

      {/* Display right data */}
      {/* <h3>Right Data:</h3>
      <div className="additional-data">
        {right &&
          Object.values(right).map((rightWeek, index) => (
            <div key={index}>
              <p>Week: {index + 1}</p>
              <p>Start: {rightWeek.start}</p>
              <p>End: {rightWeek.end}</p>
              <p>Entries:</p>
              <ul>
                {rightWeek.entries.map((rightDateEntry, i) => (
                  <li key={i}>
                    <p>Date: {rightDateEntry.date}</p>
                    <ul>
                      {rightDateEntry.entries.map((rightEntry, j) => (
                        <li key={j}>
                          <p>Location: {rightEntry.location}</p>
                          <p>
                            Volume: {rightEntry.volume} {rightEntry.unit}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))} */}

      {/* Display data from the left object */}
      {/* <h3>Left Data:</h3>
        {left &&
          Object.values(left).map((leftWeek, index) => (
            <div key={`left-${index}`}>
              <p>Week: {index + 1}</p>
              <p>Start: {leftWeek.start}</p>
              <p>End: {leftWeek.end}</p>
              <p>Entries:</p>
              <ul>
                {leftWeek.entries.map((leftDateEntry, i) => (
                  <li key={`left-${index}-${i}`}>
                    <p>Date: {leftDateEntry.date}</p>
                    <ul>
                      {leftDateEntry.entries.map((leftEntry, j) => (
                        <li key={`left-${index}-${i}-${j}`}>
                          <p>Location: {leftEntry.location}</p>
                          <p>
                            Volume: {leftEntry.volume} {leftEntry.unit}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))} */}
    </div>
    // </div>
  );
};

export default MonthlyChart;

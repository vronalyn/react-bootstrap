import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";
import {
  getGoalsWithAlertFalse,
  updateGoal,
  addActivityLog,
} from "../firebase/function";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logs = ({ goals, setGoals }) => {
  const [levelValue, setLevelValue] = useState();
  const [showGoalAlert, setShowGoalAlert] = useState(false);
  const [coverageArea, setCoverageArea] = useState("");
  const [goalLiters, setGoalLiters] = useState("");
  // const [goals, setGoals] = useState([]);
  const [currentWaterUsage, setCurrentWaterUsage] = useState(0);

  // Water Usage simulation
  // console.log("Water Usage: " + currentWaterUsage);
  // useEffect(() => {
  //   // Simulate increasing water usage every second
  //   const interval = setInterval(() => {
  //     setCurrentWaterUsage((prevUsage) => prevUsage + 50); // Increase water usage by 1 unit
  //   }, 1000);

  //   // Clean up interval on component unmount
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    // Call the function to fetch goals from Firestore
    const fetchGoals = async () => {
      const goalsFromFirestore = await getGoalsWithAlertFalse(setGoals);
      // setGoals(goalsFromFirestore);
    };

    fetchGoals(); // Call the fetchGoals function
  }, []);

  useEffect(() => {
    // Define an async function to handle asynchronous operations
    const handleGoals = async () => {
      // Create an array to store promises for each goal processing
      const promises = goals.map(async (goal) => {
        if (
          goal.goalLiters &&
          currentWaterUsage >= goal.goalLiters &&
          !goal.goalAlert
        ) {
          const message = ` The water consumption target of ${goal.goalLiters} liters for ${goal.coverageArea} has been met.`;
          toast.warning(message);
          const icon = "danger";
          await addActivityLog(goal.id, message, icon);
          try {
            await updateGoal(goal.id, { goalAlert: true });
          } catch (error) {
            console.error("Error updating goal alert:", error);
          }
        }

        const percentage = calculatePercentage(
          goal.goalLiters,
          goal.levelValue
        );
        if (percentage >= goal.levelValue && !goal.levelValueAlert) {
          const message = `The water consumption in ${goal.coverageArea} has reached ${percentage}% of the target goal of ${goal.goalLiters} liters.`;
          toast.warning(message);
          const icon = "warning";
          await addActivityLog(goal.id, message, icon);
          try {
            updateGoal(goal.id, { levelValueAlert: true });
          } catch (error) {
            console.error("Error updating goal alert:", error);
          }
        }
      });

      // Wait for all promises to resolve
      await Promise.all(promises);
    };

    // Call the async function
    handleGoals();
  }, [currentWaterUsage, goals]);

  function calculatePercentage(goalLiters, levelValue) {
    if (!goalLiters) return 0;

    const goalLitersInt = parseInt(goalLiters);

    if (goalLitersInt === 0) return 0; // Prevent division by zero

    // Calculate the percentage
    let percentage = (currentWaterUsage / goalLitersInt) * 100;

    // Cap the percentage at 100
    if (percentage >= 100) {
      percentage = 100;
    }

    return Math.floor(percentage);
  }

  return (
    <div className="card widget-card border-light shadow-sm overflow-auto">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between ">
          <h5 className="card-title widget-card-title mb-4">Activity Logs</h5>
          <div>
            <Clock format={"h:mm:ss A"} ticking={true} />
          </div>
        </div>
        <div
          className="row gy-4"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          {goals.map((goal, index) => (
            <div className="col-12" key={index}>
              <div>
                <h6 className=" text-secondary  m-0">{goal.coverageArea}</h6>
                <p className=" fw-medium  m-0 fs-5">{goal.goalLiters} L</p>
              </div>
              <div className="">
                <div className="d-flex justify-content-end ">
                  <span>
                    {goal.goalAlert
                      ? 100
                      : calculatePercentage(goal.goalLiters)}
                    %
                  </span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{
                      width: `${
                        goal.goalAlert
                          ? 100
                          : calculatePercentage(goal.goalLiters)
                      }%`,
                    }}
                    aria-valuenow={
                      goal.goalAlert
                        ? 100
                        : calculatePercentage(goal.goalLiters)
                    }
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="col-12">
                        <div className="row align-items-center">
                            <div className="col-8">
                                <div className="d-flex align-items-center">
                                    
                                    <div>
                                        <h6 className="m-0">Added User</h6>
                                        <p className="text-secondary m-0 fs-7">Feb 1, 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <h6 className="text-end text-muted fs-7">3:30 pm</h6>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default Logs;

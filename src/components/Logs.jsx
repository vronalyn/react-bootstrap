import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";
import {
  getGoalsWithAlertFalse,
  updateGoal,
  addActivityLog,
  editGoal,
  getCCSWaterUsage,
  getDormWaterUsage,
  deleteGoalToFirestore,
} from "../firebase/function";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/log.css";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/authContext";

const Logs = ({ goals, setGoals }) => {
  const { currentUser } = useAuth();
  const [showGoalAlert, setShowGoalAlert] = useState(false);
  // const [goals, setGoals] = useState([]);
  const [editedGoal, setEditedGoal] = useState(null);
  const [levelValue, setLevelValue] = useState(0);
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [initialGoal, setInitialGoal] = useState(null);

  // SImulation test
  const [ccsWaterUsage, setCCSWaterUsage] = useState(0);
  const [dormWaterUsage, setDormWaterUsage] = useState(0);
  const [currentWaterUsage, setCurrentWaterUsage] = useState(0);

  // Simulation for CCS water usage

  // useEffect(() => {
  //   const ccsInterval = setInterval(() => {
  //     setCCSWaterUsage((prevUsage) => prevUsage + 50); // Increase CCS water usage by 50 units every second
  //   }, 1000);

  //   return () => clearInterval(ccsInterval);
  // }, []);

  // // Simulation for Dorm water usage
  // useEffect(() => {
  //   const dormInterval = setInterval(() => {
  //     setDormWaterUsage((prevUsage) => prevUsage + 30); // Increase Dorm water usage by 30 units every second
  //   }, 1000);

  //   return () => clearInterval(dormInterval);
  // }, []);

  // // Combined simulation for current water usage
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentWaterUsage((prevUsage) => prevUsage + 80); // Increase total water usage by 80 units every second
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const fetchCCSWaterUsage = async () => {
      const CCSWaterUsageFirestore = await getCCSWaterUsage(setCCSWaterUsage);
    };

    fetchCCSWaterUsage();
  }, []);

  useEffect(() => {
    const fetchDormWaterUsage = async () => {
      const DormWaterUsageFirestore = await getDormWaterUsage(
        setDormWaterUsage
      );
    };

    fetchDormWaterUsage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const currentUsage = ccsWaterUsage + dormWaterUsage;
      setCurrentWaterUsage(currentUsage);
    };

    fetchData(); // Call the fetchData function
  }, [ccsWaterUsage, dormWaterUsage]);

  useEffect(() => {
    const fetchGoals = async () => {
      const goalsFromFirestore = await getGoalsWithAlertFalse(setGoals);
    };

    fetchGoals(); // Call the fetchGoals function
  }, []);

  useEffect(() => {
    // Define an async function to handle asynchronous operations
    const handleGoals = async () => {
      const promises = goals.map(async (goal) => {
        if (
          goal.goalLiters &&
          currentWaterUsage >= goal.goalLiters &&
          !goal.goalAlert
        ) {
          const message = ` The water consumption target of ${goal.goalLiters} liters for ${goal.coverageArea} has been met.`;
          toast.warning(message, {
            autoClose: 5000,
            closeOnClick: true,
          });
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
          goal.coverageArea
        );

        if (percentage >= goal.levelValue && !goal.levelValueAlert) {
          const message = `The water consumption in ${goal.coverageArea} has reached ${percentage}% of the target goal of ${goal.goalLiters} liters.`;
          toast.warning(message, {
            autoClose: 5000,
            closeOnClick: true,
          });
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

  function calculatePercentage(goalLiters, coverageArea) {
    if (!goalLiters) return 0;

    const goalLitersInt = parseInt(goalLiters);

    if (goalLitersInt === 0) return 0; // Prevent division by zero

    // let percentage = (currentWaterUsage / goalLitersInt) * 100;
    let percentage;
    if (coverageArea === "CCS") {
      percentage = (ccsWaterUsage / goalLitersInt) * 100;
    } else if (coverageArea === "Dorm") {
      percentage = (dormWaterUsage / goalLitersInt) * 100;
    } else if (coverageArea === "MSU-IIT") {
      percentage = (currentWaterUsage / goalLitersInt) * 100;
    } else {
      return;
    }
    // Cap the percentage at 100
    if (percentage >= 100) {
      percentage = 100;
    }

    return Math.floor(percentage);
  }

  const handleEditGoal = (index) => {
    setEditedGoal(index);
    setInitialGoal({
      goalLiters: index.goalLiters,
      levelValue: index.levelValue,
    });
  };

  useEffect(() => {
    if (editedGoal !== null) {
      if (editedGoal.levelValue !== null) {
        setShowGoalAlert(true);
        setLevelValue(editedGoal.levelValue);
      } else {
        setLevelValue(0);
      }
    }
  }, [editedGoal]);

  const handleToggleChange = () => {
    setShowGoalAlert((prevShowGoalAlert) => !prevShowGoalAlert);
  };

  const handleChange = (event) => {
    let newValue = parseInt(event.target.value);
    newValue = Math.max(0, Math.min(newValue, 100));
    setEditedGoal({ ...editedGoal, levelValue: newValue });
  };

  const handleSliderClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
  };

  const closeEditGoal = () => {
    setErrorMessage1("");
    setErrorMessage2("");
  };

  const submitEditGoal = async (e) => {
    e.preventDefault();

    if (
      editedGoal.goalLiters === initialGoal.goalLiters &&
      editedGoal.levelValue === initialGoal.levelValue
    ) {
      console.log("initial goal: " + initialGoal.goalLiters);
      console.log("initial goal: " + initialGoal.levelValue);

      setErrorMessage1("No changes have been made to the goal.");
      return;
    } else {
      setErrorMessage1("");
    }

    if (showGoalAlert && levelValue === 0) {
      setErrorMessage2("Please set a level value for the goal alert.");
      return;
    } else {
      setErrorMessage2("");
    }

    const editGoalData = {
      goalLiters: editedGoal.goalLiters,
      levelValue: levelValue === 0 ? null : levelValue,
      levelValueAlert: levelValue === 0 ? true : false,
      goalAlert: false,
      modifiedBy: currentUser.email,
    };
    console.log("form id: " + editedGoal.email);
    try {
      const success = await editGoal(editGoalData, editedGoal.id);

      if (success) {
        // Display a success alert using SweetAlert
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Goal Update successfully!",
        });
        window.location.reload();
      } else {
        // Display an error alert using SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An error occurred while updating the goal.",
        });
      }
    } catch (error) {
      console.error("Error saving goal:", error);
      // Display an error alert using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while saving the goal.",
      });
    }
  };

  const handleDeleteGoal = (index) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this goal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGoalToFirestore(index.id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your goal is safe :)", "info");
      }
    });
  };

  return (
    <div className="card widget-card border-light shadow-sm overflow-auto">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between ">
          <h5 className="card-title widget-card-title mb-4">Activity Logs</h5>
          <div>
            <Clock format={"h:mm:ss A"} ticking={true} />
          </div>
        </div>
        {/* Alert testing */}

        <div>
          <div>
            <p>CCS Water Usage: {ccsWaterUsage}</p>
          </div>
          <div>
            <p>Dorm Water Usage: {dormWaterUsage}</p>
          </div>
          <div>
            <p>Total Water Usage: {currentWaterUsage}</p>
          </div>
        </div>
        <div
          className="row gy-4"
          style={{ maxHeight: "600px", overflowY: "auto" }}
        >
          {goals.map((goal, index) => (
            <div className="col-12 card-goal py-3 rounded " key={index}>
              <div className="d-flex justify-content-between ">
                <div>
                  <h6 className=" text-secondary  m-0">{goal.coverageArea}</h6>
                  <p className=" fw-medium  m-0 fs-5">{goal.goalLiters} L</p>
                  {goal.levelValue && (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <i className="bx bx-alarm text-info "></i>
                      <span className="text-secondary">{goal.levelValue}%</span>
                    </span>
                  )}
                </div>
                <div className=" w-auto ">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm bg-light rounded-circle  w-auto border-0"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-sm-end ">
                      <li>
                        <button
                          onClick={() => handleEditGoal(goal)}
                          className="dropdown-item"
                          type="button "
                          data-bs-toggle="modal"
                          data-bs-target="#setEditGoalButton"
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDeleteGoal(goal)}
                          className="dropdown-item"
                          type="button"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="d-flex justify-content-end ">
                  <span>
                    {goal.goalAlert
                      ? 100
                      : calculatePercentage(goal.goalLiters, goal.coverageArea)}
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
                          : calculatePercentage(
                              goal.goalLiters,
                              goal.coverageArea
                            )
                      }%`,
                    }}
                    aria-valuenow={
                      goal.goalAlert
                        ? 100
                        : calculatePercentage(
                            goal.goalLiters,
                            goal.coverageArea
                          )
                    }
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          ))}

          {/* Modal for edit */}

          <div
            className="modal fade"
            id="setEditGoalButton"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Goal
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {editedGoal && (
                    <form onSubmit={submitEditGoal}>
                      {errorMessage1 && (
                        <p className="text-danger mb-2">{errorMessage1}</p>
                      )}
                      <div className="mb-3">
                        <label htmlFor="coverageArea" className="form-label">
                          Coverage Area:
                        </label>
                        <select
                          className="form-select "
                          aria-label="Select coverage area"
                          id="coverageArea"
                          value={editedGoal.coverageArea}
                          disabled
                          required
                        >
                          <option>{editedGoal.coverageArea}</option>
                        </select>
                      </div>

                      <div className="mb-5">
                        <label htmlFor="goalInput" className="form-label">
                          Enter your goal (liters):
                        </label>
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            id="goalInput"
                            required
                            value={editedGoal.goalLiters}
                            onChange={(e) =>
                              setEditedGoal({
                                ...editedGoal,
                                goalLiters: parseInt(e.target.value),
                              })
                            }
                          />
                          <span className="input-group-text" id="goalHelp">
                            liters
                          </span>
                        </div>
                      </div>
                      <div className="form-check form-switch form-check-reverse d-flex gap-5 ">
                        <div>
                          <label
                            className="form-check-label"
                            htmlFor="goalToggle"
                          >
                            <h6>Set a Percentage Level for Goal Alerts!</h6>
                          </label>
                        </div>
                        <div className="">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="goalToggle"
                            role="switch"
                            checked={showGoalAlert}
                            onChange={handleToggleChange}
                          />
                          <p>{levelValue}</p>
                        </div>
                      </div>

                      <div>
                        {showGoalAlert && (
                          <div>
                            <div className=" mb-5 ">
                              <p className="fs-7 text-secondary ">
                                Input a percentage to receive timely
                                notifications and stay motivated as you achieve
                                milestones. Customize your threshold, stay
                                informed, and keep pushing towards your
                                targets!"
                              </p>
                            </div>
                            <div className="d-flex justify-content-center">
                              <div className="w-100 pe-lg-4  ps-lg-4 ">
                                {errorMessage2 && (
                                  <p className="text-danger mb-2">
                                    {errorMessage2}
                                  </p>
                                )}

                                <label
                                  htmlFor="goalThreshold"
                                  className="form-label"
                                >
                                  Percentage Level:
                                </label>
                                <div>
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={levelValue}
                                    onChange={handleChange}
                                    onClick={handleSliderClick}
                                    className="slider w-100"
                                    id="goalThreshold"
                                  />
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span>0</span>
                                  <p className="border p-1">
                                    <span>{levelValue}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={closeEditGoal}
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

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

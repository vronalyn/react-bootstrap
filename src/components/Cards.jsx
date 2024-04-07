import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/authContext";
import { addGoalToFirestore, fetchRecentBilling } from "../firebase/function";
import { format } from "date-fns";

const Cards = ({ goals, setGoals }) => {
  const { currentUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [levelValue, setLevelValue] = useState(0);
  const [showGoalAlert, setShowGoalAlert] = useState(false);
  const [coverageArea, setCoverageArea] = useState("");
  const [goalLiters, setGoalLiters] = useState();
  const [billing, setBilling] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchRecentBilling(setBilling);
    return () => unsubscribe();
  }, []);

  console.log("billing " + billing);
  const handleCloseModal = () => {
    setShowGoalAlert(false);
    setCoverageArea("");
    setGoalLiters("");
    setLevelValue(0);
  };

  // const [goals, setGoals] = useState([]);

  const handleChange = (event) => {
    let newValue = parseInt(event.target.value);
    newValue = Math.max(0, Math.min(newValue, 100));
    setLevelValue(newValue);
  };

  const handleSliderClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
  };

  const handleToggleChange = () => {
    setShowGoalAlert((prevShowGoalAlert) => !prevShowGoalAlert);
  };

  // levelValue: levelValue === 0 ? null : levelValue,
  // levelValueAlert: levelValue === 0 ? true : false,
  const closeEditGoal = () => {
    setErrorMessage("");
  };
  const handleSaveGoal = async (e) => {
    e.preventDefault();

    if (showGoalAlert && levelValue === 0) {
      setErrorMessage("Please set a level value for the goal alert.");
      return;
    }

    const newGoal = {
      coverageArea: coverageArea,
      goalLiters: goalLiters,
      levelValue: levelValue === 0 ? null : levelValue,
      levelValueAlert: levelValue === 0 ? true : false,
      goalAlert: false,
      createdBy: currentUser.uid,
    };

    try {
      const success = await addGoalToFirestore(newGoal);

      if (success) {
        // Display a success alert using SweetAlert
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Goal saved successfully!",
        });

        // After the user closes the alert, close the modal
        handleCloseModal();
        window.location.reload();
      } else {
        // Display an error alert using SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An error occurred while saving the goal.",
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

  return (
    <section className="py-2 py-md-3">
      <div className="row">
        <div className="col-12">
          <div className="row gy-2">
            <div className="col-12 col-sm-4">
              {billing.map((item) => (
                <div className="card widget-card border-light shadow-sm">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title widget-card-title fs-6 mb-3">
                          Usage
                        </h5>
                        <h4 className="card-subtitle text-body-secondary m-0">
                          {item.total_volume} L
                        </h4>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div className="lh-1 text-white bg-info-cstm rounded-circle p-3 d-flex align-items-center justify-content-center">
                            <i className="bx bx-droplet fs-4"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-3">
                          <span className="lh-1 me-3 bg-success-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                            <i className="bi bi-arrow-down-short text-success"></i>
                          </span>
                          <div>
                            <p className="badge text-success p-0 fs-7 mb-0">
                              -9%
                            </p>
                            <br />
                            <p className="fs-7 mb-0 badge text-secondary p-0">
                              {format(item.month.toDate(), "'As of' MMMM yyyy")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-12 col-sm-4">
              {billing.map((item) => (
                <div className="card widget-card border-light shadow-sm">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-8">
                        <h5 className="card-title widget-card-title fs-6 mb-3">
                          Bill{" "}
                        </h5>
                        <h4 className="card-subtitle text-body-secondary m-0 text-uppercase ">
                          {" "}
                          {item.amount} Php
                        </h4>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div className="lh-1 text-white bg-info-cstm rounded-circle p-3 d-flex align-items-center justify-content-center">
                            <i className="bx bx-receipt fs-4"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex align-items-center mt-3">
                          <span className="lh-1 me-3 bg-success-subtle text-danger rounded-circle p-1 d-flex align-items-center justify-content-center">
                            <i className="bi bi-arrow-down-short bsb-rotate-45 text-success "></i>
                          </span>
                          <div>
                            <p className="badge text-success p-0 fs-7 mb-0">
                              -20%
                            </p>
                            <br />

                            <p className="fs-7 mb-0 badge text-secondary p-0">
                              {format(item.month.toDate(), "'As of' MMMM yyyy")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-12 col-sm-4">
              <div className="card widget-card border-light shadow-sm">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-8">
                      <h5 className="card-title widget-card-title fs-6 mb-3">
                        Goal
                      </h5>
                      <p className="card-subtitle p-0 fs-7 text-secondary m-0">
                        Enter your desired monthly water consumption
                      </p>
                    </div>
                    <div className="col-4">
                      <div className="d-flex justify-content-end">
                        <div className="lh-1 text-white bg-info-cstm rounded-circle p-3 d-flex align-items-center justify-content-center">
                          <i className="bx bx-target-lock fs-4"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#setGoalButton"
                      className="btn btn-primary text-uppercase "
                    >
                      set
                    </button>
                  </div>

                  {/* Modal */}
                  <div
                    className="modal fade"
                    id="setGoalButton"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Goal
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={handleSaveGoal}>
                            <div className="mb-3">
                              <label
                                htmlFor="coverageArea"
                                className="form-label"
                              >
                                Coverage Area:
                              </label>
                              <select
                                className="form-select"
                                aria-label="Select coverage area"
                                id="coverageArea"
                                value={coverageArea}
                                onChange={(e) =>
                                  setCoverageArea(e.target.value)
                                }
                                required
                              >
                                <option disabled value="">
                                  Select coverage area
                                </option>
                                <option value="MSU-IIT">MSU-IIT </option>
                                <option value="CCS">CCS</option>
                                <option value="Dorm">Dorm</option>
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
                                  value={goalLiters}
                                  onChange={(e) =>
                                    setGoalLiters(e.target.value)
                                  }
                                />
                                <span
                                  className="input-group-text"
                                  id="goalHelp"
                                >
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
                                  <h6>
                                    Set a Percentage Level for Goal Alerts!
                                  </h6>
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
                              </div>
                            </div>

                            <div>
                              {showGoalAlert && (
                                <div>
                                  <div className=" mb-5 ">
                                    <p className="fs-7 text-secondary ">
                                      Input a percentage to receive timely
                                      notifications and stay motivated as you
                                      achieve milestones. Customize your
                                      threshold, stay informed, and keep pushing
                                      towards your targets!"
                                    </p>
                                  </div>
                                  <div className="d-flex justify-content-center">
                                    <div className="w-100 pe-lg-4  ps-lg-4 ">
                                      {errorMessage && (
                                        <p className="text-danger mb-2">
                                          {errorMessage}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;

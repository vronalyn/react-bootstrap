import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar2 from "../components/Navbar2";
import Cards from "../components/Cards";
import Logs from "../components/Logs";
import Chart from "../components/Chart";

// added
import TotalWeekly from "./TotalWeekly";
import Realtime from "../components/Realtime";
import TotalHourly from "./TotalHourly";
// import Joyride, { STATUS } from "react-joyride";
import TutorialProcess from "../components/TutorialProcess";
import TotalMonthly from "./TotalMonthly";
import PieMonthly from "./PieMonthly";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [goals, setGoals] = useState([]);
  const [runTutorial, setRunTutorial] = useState(false);
  const [showBeginTour, setShowBeginTour] = useState(false);

  // const [{ run, steps }, setState] = useState({
  //   run: true,
  //   steps: [
  //     {
  //       content: <h2>Enhance Your Experience: WaterMS Assistance Tool</h2>,
  //       locale: { skip: <strong>SKIP</strong> },
  //       placement: "center",
  //       target: "body",
  //     },
  //     {
  //       content: <p>insert description here</p>,
  //       locale: { skip: <strong>SKIP</strong> },
  //       placement: "bottom",
  //       target: "#step-one",
  //       title: "Goal Alert System",
  //     },
  //     {
  //       content: <p>insert description here</p>,
  //       locale: { skip: <strong>SKIP</strong> },
  //       placement: "left-start",
  //       target: "#step-two",
  //       title: "Goal Alert System",
  //     },
  //     {
  //       content: <p>insert description here</p>,
  //       locale: { skip: <strong>SKIP</strong> },
  //       placement: "right-start",
  //       target: "#step-three",
  //       title: "Chart Labels",
  //     },
  //     {
  //       content: <p>insert description here</p>,
  //       locale: { skip: <strong>SKIP</strong> },
  //       placement: "right-start",
  //       target: "#step-four",
  //       title: "Date Selection",
  //     },
  //     {
  //       content: <p>insert description here</p>,
  //       locale: { skip: <strong>SKIP</strong> },
  //       placement: "right-start",
  //       target: "#step-five",
  //       title: "Explore Insights: Building",
  //     },
  //     {
  //       content: <p>insert description here</p>,
  //       locale: { skip: <strong>SKIP</strong> },
  //       placement: "right-start",
  //       target: "#step-six",
  //       title: "Explore Insights: Analytics",
  //     },
  //   ],
  // });

  // one time execute
  // const [run, setRun] = useState(false);
  // const steps = [
  //   {
  //     content: <h2>Enhance Your Experience: WaterMS Assistance Tool</h2>,
  //     locale: { skip: <strong>SKIP</strong> },
  //     placement: "center",
  //     target: "body",
  //   },
  //   {
  //     content: <p>insert description here</p>,
  //     locale: { skip: <strong>SKIP</strong> },
  //     placement: "bottom",
  //     target: "#step-one",
  //     title: "Goal Alert System",
  //   },
  //   {
  //     content: <p>insert description here</p>,
  //     locale: { skip: <strong>SKIP</strong> },
  //     placement: "left-start",
  //     target: "#step-two",
  //     title: "Goal Alert System",
  //   },
  //   {
  //     content: <p>insert description here</p>,
  //     locale: { skip: <strong>SKIP</strong> },
  //     placement: "right-start",
  //     target: "#step-three",
  //     title: "Chart Labels",
  //   },
  //   {
  //     content: <p>insert description here</p>,
  //     locale: { skip: <strong>SKIP</strong> },
  //     placement: "right-start",
  //     target: "#step-four",
  //     title: "Date Selection",
  //   },
  //   {
  //     content: <p>insert description here</p>,
  //     locale: { skip: <strong>SKIP</strong> },
  //     placement: "right-start",
  //     target: "#step-five",
  //     title: "Explore Insights: Building",
  //   },
  //   {
  //     content: <p>insert description here</p>,
  //     locale: { skip: <strong>SKIP</strong> },
  //     placement: "right-start",
  //     target: "#step-six",
  //     title: "Explore Insights: Analytics",
  //   },
  // ];

  // useEffect(() => {
  //   const joyrideCompleted = localStorage.getItem("joyrideCompleted");
  //   if (!joyrideCompleted) {
  //     setRun(true);
  //   }
  // }, []);

  // const handleJoyrideCallback = (data) => {
  //   const { status } = data;
  //   if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
  //     localStorage.setItem("joyrideCompleted", "true");
  //     setRun(false);
  //   }
  // };

  // Function to toggle Joyride from Navbar
  const startTutorial = () => {
    setRunTutorial(true);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="">
      {/* <Joyride
        continuous
        // callback={() => {}}
        callback={handleJoyrideCallback}
        run={run}
        steps={steps}
        hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
      /> */}
      <TutorialProcess run={runTutorial} setRun={setRunTutorial} />
      <div className="wrapper ">
        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          id={["step-four", "step-five"]}
        />
        <div className="main">
          <Navbar2
            toggleSidebar={toggleSidebar}
            startTutorial={startTutorial}
            id="step-seven"
          />
          <main className="content px-3 py-2 bg-secondary bg-opacity-10">
            <div className="container-fluid">
              <div className="mb-3">
                <h1 className="fw-bold">Dashboard</h1>
                {/* <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Dashboard
                    </li>
                  </ol>
                </nav> */}
              </div>

              <Cards goals={goals} setGoals={setGoals} id="step-one" />

              <div className="row">
                <div className="col-md-8">
                  <div className="row mb-4" id="step-three">
                    <div className="col-md-12 d-flex align-items-center">
                      <div className="col-8 col-md-8">
                        <div className="heading-text">
                          <h3 className="lh-1 fw-bold">Realtime Analytics</h3>
                          <p>
                            Analyze water consumption trends, track real-time
                            usage, and monitor resource management with
                            intuitive tools.
                          </p>
                        </div>
                      </div>

                      {/* <div className="col-4 col-md-4 ">
                        <div className="d-flex justify-content-end ">
                          <a href="#">view all</a>
                        </div>
                      </div> */}
                    </div>
                    <TotalHourly />
                  </div>
                  {/* added */}

                  <TotalWeekly id="step-four" />

                  <TotalMonthly />
                </div>

                <div className="col-md-4">
                  <Logs goals={goals} setGoals={setGoals} id="step-two" />
                  <PieMonthly />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div
        className="floating-btn"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "10px",
          zIndex: "1000",
          width: "200px",
        }}
      >
        <div className="d-flex flex-column gap-1 align-items-center justify-content-center ">
          {showBeginTour && (
            <div className=" bg-dark-subtle p-2 rounded-1 fs-7">Begin Tour</div>
          )}

          <div
            id="step-eight"
            onClick={() => {
              startTutorial();
            }}
            className="btn btn-dark  rounded-circle d-flex align-items-center justify-content-center "
            style={{
              width: "50px",
              height: "50px",
            }}
            onMouseEnter={() => setShowBeginTour(true)}
            onMouseLeave={() => setShowBeginTour(false)}
          >
            <i className="bx bx-bulb fs-3 text-primary"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

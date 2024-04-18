import React, { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";

const TutorialProcess = ({ run, setRun }) => {
  // const [run, setRun] = useState(false);
  const steps = [
    {
      // content: <h2>Enhance Your Experience: WaterMS Assistance Tool</h2>,

      content: (
        <div className="w-100 ">
          <div className=" d-flex align-items-center justify-content-center mb-3">
            <div
              className="rounded-circle bg-light d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                boxShadow:
                  "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
              }}
            >
              <i class="bx bxs-droplet text-primary fs-3"></i>
            </div>
          </div>
          <span className=" fs-4 fw-bold text-black ">Welcome to WaterMS</span>
          <p className="mt-3 fs-6 fw-light ">
            Let's take a quick tour to help you get familiar with our features
            and how to make the most out of your experience.
          </p>
        </div>
      ),
      locale: { skip: <div className=" ws text-uppercase  ">Skip TOur</div> },
      placement: "center",
      target: "body",
    },
    {
      content: (
        <div className="w-100 ">
          <span className=" fs-4 fw-bold text-black ">
            Water Usage Threshold Setting
          </span>
          <p className="mt-3 fs-6 fw-light ">
            Set your desired usage threshold to receive alerts when water
            consumption reaches a specified limit.
          </p>
        </div>
      ),
      locale: { skip: <div className=" ws text-uppercase  ">Skip TOur</div> },
      placement: "bottom",
      target: "#step-one",
      // title: "Water Usage Threshold Setting",
    },
    {
      content: (
        <div className="w-100 ">
          <span className=" fs-4 fw-bold text-black ">
            Water Usage Alert System{" "}
          </span>
          <p className="mt-3 fs-6 fw-light text-black  ">
            Monitor water consumption levels in real-time and track usage
            patterns, receiving system alerts when consumption exceeds
            predefined thresholds.
          </p>
        </div>
      ),
      locale: { skip: <div className=" ws text-uppercase  ">Skip TOur</div> },
      placement: "left-start",
      target: "#step-two",
    },
    {
      content: (
        <div className="w-100 ">
          <span className=" fs-4 fw-bold text-black ">
            Water Usage Alert System{" "}
          </span>
          <p className="mt-3 fs-6 fw-light text-black  ">
            Monitor water consumption levels in real-time and track usage
            patterns, receiving system alerts when consumption exceeds
            predefined thresholds.
          </p>
        </div>
      ),
      locale: { skip: <div className=" ws text-uppercase  ">Skip TOur</div> },
      placement: "right-start",
      target: "#step-three",
      title: "Chart Labels",
    },
    {
      content: (
        <div className="w-100 ">
          <span className=" fs-4 fw-bold text-black ">
            Water Usage Alert System{" "}
          </span>
          <p className="mt-3 fs-6 fw-light text-black  ">
            Monitor water consumption levels in real-time and track usage
            patterns, receiving system alerts when consumption exceeds
            predefined thresholds.
          </p>
        </div>
      ),
      locale: { skip: <div className=" ws text-uppercase  ">Skip TOur</div> },

      placement: "right-start",
      target: "#step-four",
      title: "Date Selection",
    },
    {
      content: (
        <div className="w-100 ">
          <span className=" fs-4 fw-bold text-black ">
            Building Water Usage Insights{" "}
          </span>
          <p className="mt-3 fs-6 fw-light text-black  ">
            View water consumption data for individual buildings to track
            trends, identify anomalies, and assess performance over time.{" "}
          </p>
        </div>
      ),
      locale: { skip: <div className=" ws text-uppercase  ">Skip TOur</div> },
      placement: "right-start",
      target: "#step-five",
      // title: "Explore Insights: Building",
    },
    {
      content: (
        <div className="w-100 ">
          <span className=" fs-4 fw-bold text-black ">
            Water Consumption Trends{" "}
          </span>
          <p className="mt-3 fs-6 fw-light text-black  ">
            View historical data trends to identify patterns and fluctuations in
            water usage over time
          </p>
        </div>
      ),
      locale: { skip: <div className=" ws text-uppercase  ">Skip TOur</div> },
      placement: "right-start",
      target: "#step-six",
    },
    // {
    //   content: (
    //     <div style={{ textAlign: "justify" }}>
    //       <p>Click this icon for helpful guidance and support .</p>
    //     </div>
    //   ),
    //   locale: { skip: <strong>SKIP</strong> },
    //   placement: "bottom",
    //   target: "#step-seven",
    //   title: "WaterMS Assistance Tool",
    // },
  ];

  useEffect(() => {
    const joyrideCompleted = localStorage.getItem("joyrideCompleted");
    if (!joyrideCompleted && !run) {
      setRun(true);
    }
  }, [run, setRun]);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      localStorage.setItem("joyrideCompleted", "false");
      setRun(false);
    }
  };

  return (
    <Joyride
      continuous
      callback={handleJoyrideCallback}
      run={run}
      steps={steps}
      hideCloseButton
      scrollToFirstStep
      showSkipButton
      showProgress
      styles={{
        options: {
          // arrowColor: "#e3ffeb",
          // backgroundColor: "#e3ffeb",
          // overlayColor: "rgba(79, 26, 0, 0.4)",
          primaryColor: "#0d6efd",
          textColor: "black",
          width: 600,
          zIndex: 1000,
        },
      }}
    />
  );
};

export default TutorialProcess;

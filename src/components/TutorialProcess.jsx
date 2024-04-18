import React, { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";

const TutorialProcess = ({ run, setRun }) => {
  // const [run, setRun] = useState(false);
  const steps = [
    {
      content: <h2>Enhance Your Experience: WaterMS Assistance Tool</h2>,
      locale: { skip: <strong>SKIP</strong> },
      placement: "center",
      target: "body",
    },
    {
      content: <p>insert description here</p>,
      locale: { skip: <strong>SKIP</strong> },
      placement: "bottom",
      target: "#step-one",
      title: "Goal Alert System",
    },
    {
      content: <p>insert description here</p>,
      locale: { skip: <strong>SKIP</strong> },
      placement: "left-start",
      target: "#step-two",
      title: "Goal Alert Logs",
    },
    {
      content: (
        <div style={{ textAlign: "justify" }}>
          <p>This chart displays data over varying periods:</p>
          <ul>
            <li>
              <strong>Last 24 hours</strong>: Data from the most recent day,
              offering a granular view of daily trends.
            </li>
            <li>
              <strong>Last 7 days</strong>: A week's data, providing insights
              into weekly patterns and anomalies.
            </li>
            <li>
              <strong>Last 30 days</strong>: Monthly data, ideal for identifying
              broader trends and seasonal effects.
            </li>
          </ul>
        </div>
      ),
      locale: { skip: <strong>SKIP</strong> },
      placement: "right-start",
      target: "#step-three",
      title: "Chart Labels",
    },
    {
      content: (
        <div style={{ textAlign: "justify" }}>
          <p>
            This interactive date selector allows you to navigate through time
            to review data by week or month:
          </p>
          <ul>
            <li>
              <strong>Previous Period</strong>: Click the left arrow
              <span
                style={{
                  backgroundColor: "#dcdcdc",
                  padding: ".3rem .4rem",
                  borderRadius: ".4rem",
                  margin: ".2rem",
                }}
              >
                <i className="bx bx-chevron-left"></i>
              </span>
              to move to the earlier week or month, depending on your current
              view.
            </li>
            <li>
              <strong>Next Period</strong>: Click the right arrow
              <span
                style={{
                  backgroundColor: "#dcdcdc",
                  padding: ".3rem .4rem",
                  borderRadius: ".4rem",
                  margin: ".2rem",
                }}
              >
                <i className="bx bx-chevron-right"></i>
              </span>
              to advance to the next week or month, aligning with your
              selection.
            </li>
          </ul>
          <p>
            The date range displayed between the arrows shows the start and end
            dates of the current period you are viewing, whether it's a week or
            a month.
          </p>
        </div>
      ),
      locale: { skip: <strong>SKIP</strong> },
      placement: "right-start",
      target: "#step-four",
      title: "Date Selection",
    },
    {
      content: (
        <div style={{ textAlign: "justify" }}>
          <p>
            To view detailed insights and analytics for specific buildings,
            explore to identify trends and opportunities for efficiency
            improvements.
          </p>
        </div>
      ),
      locale: { skip: <strong>SKIP</strong> },
      placement: "right-start",
      target: "#step-five",
      title: "Explore Insights: Building",
    },
    {
      content: (
        <div style={{ textAlign: "justify" }}>
          <p>
            To view total water consumption data across all buildings,
            categorized by weekly and monthly periods, this feature enables you
            to compare consumptions.
          </p>
        </div>
      ),
      locale: { skip: <strong>SKIP</strong> },
      placement: "right-start",
      target: "#step-six",
      title: "Explore Insights: Analytics",
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
      localStorage.setItem("joyrideCompleted", "true");
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
    />
  );
};

export default TutorialProcess;

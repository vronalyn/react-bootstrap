import React, { useEffect, useState } from "react";
import "./details.css";
import {
  fetchWeeklyReports,
  fetchBillingRates,
  calculateAndSaveBilled,
} from "../../firebase/function";

function BillingDetails() {
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [billingRates, setBillingRates] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [calculatingTotalBilled, setCalculatingTotalBilled] = useState(false);

  useEffect(() => {
    const unsubscribeWeeklyReports = fetchWeeklyReports(setWeeklyReports);
    const unsubscribeBillingRates = fetchBillingRates(setBillingRates);

    return () => {
      unsubscribeWeeklyReports();
      unsubscribeBillingRates();
    };
  }, []);

  useEffect(() => {
    if (billingRates.length === 1) {
      const rate = billingRates[0].rate;
      let total = 0;
      weeklyReports.forEach((report) => {
        total += report.total_volume * rate;
      });
      setTotalBill(total);
    }
  }, [weeklyReports, billingRates]);

  useEffect(() => {
    if (billingRates.length === 1) {
      const rate = billingRates[0].rate;
      const updatedReports = calculateAndSaveBilled(weeklyReports, rate);
      setWeeklyReports(updatedReports);
    }
  }, [billingRates]);

  return (
    <div className="  ">
      <div className="tabDetailContainer ">
        <div className="headerContainer">
          <div className="title">
            <span>Billing Details</span>
          </div>
          {/* <div className="prevBill">
          <div className="prevDate">
            <span>March 2024 (last billed)</span>
          </div>
          <div className="prevBillAmount">
            <span>4,000 php</span>
          </div>
        </div> */}
        </div>
        <table>
          <thead>
            <tr>
              <th>Building</th>
              <th>Water Usage (L)</th>
              <th>Rates</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {weeklyReports.map((report, index) => (
              <tr key={index}>
                <td>{report.building}</td>
                <td>{report.total_volume}</td>
                <td>{billingRates[0]?.rate}</td>{" "}
                {/* Assuming there's only one billing rate */}
                <td>{report.totalBilled}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="totalBillContainer">
          <div className="">
            <span className="total">
              <span className="totalBill">{totalBill} php</span>
            </span>
          </div>
          <div className="totalBillDate">
            <span>Total (As of this March 2024 )</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingDetails;

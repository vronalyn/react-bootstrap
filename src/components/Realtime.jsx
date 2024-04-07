import React, { useState, useEffect } from "react";

// added
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
} from "@firebase/firestore";
import { db } from "../firebase/firebase";
import RealtimeChart from "./RealtimeChart";

const Realtime = () => {
  const [usageCCSRight, setUsageCCSRight] = useState([]);
  const [usageCCSLeft, setUsageCCSLeft] = useState([]);
  const [usageDormLeft, setUsageDormLeft] = useState([]);
  const [usageDormRight, setUsageDormRight] = useState([]);

  // ====================================== realtime prototype
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, "CCS"), orderBy("DateTime", "desc"), limit(5)),
  //     (snapshot) => {
  //       const data = snapshot.docs.map((doc) => doc.data());
  //       setUsageCCSRight(data);
  //       console.log("CCS Data:", data);
  //     },
  //     (error) => {
  //       console.error("Error fetching data: ", error);
  //     }
  //   );

  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, "Dorm"), orderBy("DateTime", "desc"), limit(5)),
  //     (snapshot) => {
  //       const data = snapshot.docs.map((doc) => doc.data());
  //       setUsageDormRight(data);
  //       console.log("Dorm Data:", data);
  //     },
  //     (error) => {
  //       console.error("Error fetching data: ", error);
  //     }
  //   );

  //   return () => unsubscribe();
  // }, []);

  // ===============================================

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "CCS"),
        where("location", "==", "CCSRight"),
        orderBy("DateTime", "desc"),
        limit(5)
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setUsageCCSRight(data);
        console.log("CCS Right Data:", data);
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "CCS"),
        where("location", "==", "CCSLeft"),
        orderBy("DateTime", "desc"),
        limit(5)
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setUsageCCSLeft(data);
        console.log("CCS Left Data:", data);
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "Dorm"),
        where("location", "==", "DormLeft"),
        orderBy("DateTime", "desc"),
        limit(5)
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setUsageDormLeft(data);
        console.log("Dorm Left Data:", data);
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "Dorm"),
        where("location", "==", "DormRight"),
        orderBy("DateTime", "desc"),
        limit(5)
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setUsageDormRight(data);
        console.log("Dorm Right Data:", data);
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="card widget-card border-light shadow-sm">
        <div className="card-body p-4">
          <div className="d-block d-sm-flex align-items-center justify-content-between mb-3">
            <div className="mb-3 mb-sm-0">
              <p>Realtime</p>
            </div>
          </div>
          <RealtimeChart
            rightCCS={usageCCSRight}
            leftCCS={usageCCSLeft}
            rightDorm={usageDormRight}
            leftDorm={usageDormLeft}
            // colors="#2D4B8A"

            building="CCS"
            type="line"
            height={350}
          />
          <div id="bsb-chart-1"></div>
        </div>
      </div>

      {/* <div className="card widget-card border-light shadow-sm">
        <div className="card-body p-4">
          <div className="d-block d-sm-flex align-items-center justify-content-between mb-3">
            <div className="mb-3 mb-sm-0">
              <p>Realtime - College of Computer Studies</p>
            </div>
          </div>
          <RealtimeChart
            right={usageCCSRight}
            left={usageCCSLeft}
            // colors="#2D4B8A"

            building="CCS"
            type="line"
            height={350}
          />
          <div id="bsb-chart-1"></div>
        </div>
      </div>

      <div className="card widget-card border-light shadow-sm">
        <div className="card-body p-4">
          <div className="d-block d-sm-flex align-items-center justify-content-between mb-3">
            <div className="mb-3 mb-sm-0">
              <p>Realtime - Alumni Dormitory</p>
            </div>
          </div>
          <RealtimeChart
            right={usageDormRight}
            left={usageDormLeft}
            // colors="#3C63C6"
            building="Dorm"
            type="line"
            height={350}
          />
          <div id="bsb-chart-1"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Realtime;

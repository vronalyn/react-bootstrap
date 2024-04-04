import { db } from "./firebase";
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
  orderBy,
} from "firebase/firestore";
import Swal from "sweetalert2";

export const fetchWeeklyReports = (setWeeklyReports) => {
  const sunday = new Date();
  sunday.setDate(sunday.getDate() - sunday.getDay());

  const startOfWeek = new Date(sunday); // Start of the current week
  startOfWeek.setHours(0, 0, 0, 0); // Set to midnight of the start of the week

  const endOfWeek = new Date(sunday); // End of the current week
  endOfWeek.setDate(sunday.getDate() + 6); // Add 6 days to get to Saturday (end of the week)
  endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the last day of the week

  const weeklyReportsRef = query(
    collection(db, "Weekly_Report"),
    where("createdAt", ">=", startOfWeek), // Filter documents created on or after the start of the week
    where("createdAt", "<=", endOfWeek), // Filter documents created on or before the end of the week
    limit(10)
  );

  console.log("Start of week:", startOfWeek);
  console.log("End of week:", endOfWeek);

  return onSnapshot(weeklyReportsRef, (snapshot) => {
    const reports = snapshot.docs.map((doc) => doc.data());
    console.log("Weekly reports:", reports);

    setWeeklyReports(reports);
  });
};

export const fetchBillingRates = (setBillingRates) => {
  const billingRatesRef = collection(db, "Billing_Rates");

  return onSnapshot(billingRatesRef, (snapshot) => {
    const rates = snapshot.docs.map((doc) => doc.data());
    setBillingRates(rates);
  });
};

export const updateBillingRates = async (values) => {
  const { liters, rate } = values;
  try {
    const billingRatesRef = await updateDoc(
      doc(db, "Billing_Rates", "o0k4w4jjN8Ym8pWvmFSE"),
      {
        no_of_liters: liters,
        rate: rate,
        modifiedAt: serverTimestamp(),
      }
    );
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const calculateAndSaveBilled = (weeklyReports, billingRate) => {
  return weeklyReports.map((report) => {
    const totalBilled = report.total_volume * billingRate;
    return { ...report, totalBilled, billingRate }; // Add total billed to each report
  });
};

export const fetchBilling = (setBilling) => {
  const billingRef = collection(db, "Billing");

  return onSnapshot(billingRef, (snapshot) => {
    const billing = snapshot.docs.map((doc) => doc.data());
    setBilling(billing);
  });
};

export const addGoalToFirestore = async (newGoal) => {
  try {
    // Add additional fields to the new goal object
    const goalWithMeta = {
      ...newGoal,
      createdAt: serverTimestamp(), // Timestamp of when the goal was created
    };

    // await db.collection("goals").add(goalWithMeta);
    await addDoc(collection(db, "goals"), goalWithMeta);

    return true;
  } catch (error) {
    console.error("Error adding goal to Firestore:", error);
    return false;
  }
};

export const getGoalsWithAlertFalse = async (setGoals) => {
  try {
    // const goalRef = query(
    //   collection(db, "goals"),
    //   where("goalAlert", "==", false)
    // );
    const goalRef = collection(db, "goals");

    // Subscribe to the query snapshot to get real-time updates
    const unsubscribe = onSnapshot(goalRef, (snapshot) => {
      if (!snapshot.empty) {
        // Check if the snapshot contains documents
        const goalData = snapshot.docs.map((doc) => ({
          id: doc.id, // Include the id property
          ...doc.data(),
        }));
        setGoals(goalData);
      } else {
        console.log("No documents found");
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error getting goals:", error);
    throw new Error("Failed to fetch goals. Please try again later.");
  }
};

export const updateGoal = async (goalId, newData) => {
  try {
    const goalDocRef = doc(db, "goals", goalId);

    // Update the document with the new data
    await updateDoc(goalDocRef, newData);

    console.log("Goal updated successfully!");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error updating goal:", error);
    return false; // Return false to indicate failure
  }
};

export const addActivityLog = async (goalId, message, icon) => {
  try {
    const logRef = collection(db, "activity_Log");
    const logData = {
      goalId: goalId,
      message: message,
      icon: icon,
      createdAt: serverTimestamp(),
    };
    await addDoc(logRef, logData);
    console.log("Activity log added successfully");
  } catch (error) {
    console.error("Error adding activity log:", error);
  }
};

export const getActivityLogs = async (setActivityLog) => {
  try {
    const logsRef = collection(db, "activity_Log"); // Replace 'activity_logs' with your actual collection name
    const logsQuery = query(logsRef, orderBy("createdAt", "desc")); // Order logs by 'timestamp' in descending order

    const unsubscribe = onSnapshot(logsQuery, (snapshot) => {
      if (!snapshot.empty) {
        const activityLogData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivityLog(activityLogData);
      } else {
        console.log("No documents found");
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    return []; // Return an empty array if there's an error
  }
};

// dont delete this as this is working but nit logically work on our code
// console.log("Weekly Billed:", updatedReports);
// try {
//   // Loop through the updated reports and add each one to the "Billing" collection
//   for (const updatedReport of updatedReports) {
//     const docRef = a
//       total_volume: updatedReport.total_volume,
//       total_billed: updatedReport.totalBilled,
//       rate: updatedReport.billingRate,
//       building: updatedReport.building,
//       createdAt: serverTimestamp(),
//     });
//     console.log("Document written with ID: ", docRef.id);
//   }
// } catch (error) {
//   console.error("Error adding document: ", error);
// }
// };

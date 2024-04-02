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

// console.log("Weekly Billed:", updatedReports);
// try {
//   // Loop through the updated reports and add each one to the "Billing" collection
//   for (const updatedReport of updatedReports) {
//     const docRef = addDoc(collection(db, "Billing"), {
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
// Function to reauthenticate the user with their current password
// export const doReauthenticateUser = async (email, currentPassword) => {
//   try {
//     // Create a credential with the user's email and current password
//     const credential = await auth.EmailAuthProvider.credential(
//       email,
//       currentPassword
//     );

//     // Reauthenticate the user with the credential
//     await auth.currentUser.reauthenticateWithCredential(credential);

//     // Reauthentication successful
//     return true;
//   } catch (error) {
//     // Reauthentication failed
//     throw error;
//   }
// };

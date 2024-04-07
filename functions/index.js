const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
admin.initializeApp();
app.use(express.json());
app.use(cors());

app.post("/createUser", async (req, res) => {
  try {
    const { firstname, lastname, role, status } = req.body;
    if (!firstname || !lastname || !role || status === undefined) {
      return res.status(400).send("Missing required fields");
    }

    const email = `${firstname}.${lastname}@gmail.com`;
    const password = `${firstname}${lastname}`;
    const isUserActive = status === "Active";
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: firstname,
      disabled: !isUserActive,
    });

    await admin.firestore().collection("users").doc(userRecord.uid).set({
      email,
      firstname,
      lastname,
      role,
      status: status,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      profileImage: "", // Corrected variable name
    });

    res.status(200).send(`User created successfully: ${userRecord.uid}`);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send("Error creating user");
  }
});

exports.createUser = functions.https.onRequest(app);

// Update user data endpoint
app.put("/updateUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { firstname, lastname, role, status } = req.body;

    // Check if the required fields are provided
    if (!firstname || !lastname || !role || status === undefined) {
      return res.status(400).send("Missing required fields");
    }

    // Update the user data in Firebase Authentication
    await admin.auth().updateUser(userId, {
      displayName: firstname,
      disabled: status !== "Active",
    });

    // Update the user data in Firestore
    await admin.firestore().collection("users").doc(userId).update({
      firstname,
      lastname,
      role,
      status,
      modifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).send("Error updating user");
  }
});

// Export the updateUser function
exports.updateUser = functions.https.onRequest(app);

exports.logRateChange = functions.firestore
  .document("Billing_Rates/1yiH9veKkCiXZxQwOCMM")
  .onUpdate(async (change, context) => {
    try {
      const newValue = change.after.data(); // New rate data
      const previousValue = change.before.data(); // Previous rate data

      // Check if there's an actual rate or no_of_liters change
      if (
        newValue.rate !== previousValue.rate ||
        newValue.no_of_liters !== previousValue.no_of_liters
      ) {
        // Add data to rate_change_log collection
        await admin.firestore().collection("rate_change_log").add({
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          createdBy: newValue.modifiedBy, // Assuming modifiedBy is available in the rate document
          no_of_liters: newValue.no_of_liters,
          rate: newValue.rate,
        });

        console.log("Rate change logged successfully");
      } else {
        console.log("No rate or no_of_liters change detected");
      }

      return null;
    } catch (error) {
      console.error("Error logging rate change:", error.message);
      throw new functions.https.HttpsError(
        "internal",
        "Error logging rate change"
      );
    }
  });

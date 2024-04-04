import { auth, db, storage } from "./firebase";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

export const doCreateUserWithEmailAndPassword = async (
  firstname,
  lastname,
  role,
  status
) => {
  const email = `${firstname}.${lastname}@gmail.com`; // Constructing email from firstname and lastname
  const password = `${firstname}${lastname}`;
  const emailVerified = false;
  const phoneNumber = "";
  const displayName = `${firstname}`;
  const photoURL = "";
  const disabled = false;
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      emailVerified,
      phoneNumber,
      displayName,
      photoURL,
      disabled
    );
    console.log(result);

    // Proceed with creating user document in Firestore
    const docRef = await setDoc(doc(db, `users`, result.user.uid), {
      userId: `${result.user.uid}`,
      email,
      firstname: firstname,
      lastname: lastname,
      role: role,
      profielImage: "",
      status: status,
      createdAt: serverTimestamp(), // Server timestamp for creation time
      modifiedAt: serverTimestamp(),
    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "User created successfully!",
    });
    return;
  } catch (error) {
    console.error("Error creating user: ", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = async (password) => {
  console.log("Changing password...");
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }
    await updatePassword(user, password);
    console.log("Password changed successfully.");
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

// // Function to reauthenticate the user with their current password
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

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};

export const doUpdateProfile = async (phoneNumber, Address, id) => {
  try {
    const docRef = await updateDoc(doc(db, "users", id), {
      phoneNumber: phoneNumber,
      address: Address,
      modifiedAt: serverTimestamp(),
    });
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Updated successfully!",
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const doUpdateUsers = async (firstname, lastname, role, id, status) => {
  try {
    const docRef = await updateDoc(doc(db, "users", id), {
      firstname: firstname,
      lastname: lastname,
      role: role,
      status: status,
      // profielImage: profImage,
      modifiedAt: serverTimestamp(),
    });
    return "User Updated successfully!";
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
export const doGetUserAccount = async (id) => {
  try {
    const docRef = await getDoc(doc(db, "users", id));
    if (docRef.exists()) {
      // Return the data retrieved from Firestore
      return docRef.data();
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user account data: ", error);
    return null;
  }
};

// export const doCreateUser = () => {
//   return auth
//     .createUser({
//       email: "user@example.com",
//       emailVerified: false,
//       phoneNumber: "+11234567890",
//       password: "secretPassword",
//       displayName: "John Doe",
//       photoURL: "http://www.example.com/12345678/photo.png",
//       disabled: false,
//     })
//     .then((userRecord) => {
//       // See the UserRecord reference doc for the contents of userRecord.
//       console.log("Successfully created new user:", userRecord.uid);
//     })
//     .catch((error) => {
//       console.log("Error creating new user:", error);
//     });
// };

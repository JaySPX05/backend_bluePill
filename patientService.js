import { db } from './firebaseConfig.js';
import { doc, setDoc, serverTimestamp, collection, addDoc } from "firebase/firestore";

/**
 * Creates a NEW patient document with a Firestore-generated unique ID.
 * @param {object} patientData - The patient's profile data.
 * @returns {Promise<string>} The new unique document ID.
 */
export const createNewPatientProfile = async (patientData) => {
  try {
    // addDoc creates a new document in the "patients" collection
    const newDocRef = await addDoc(collection(db, "patients"), {
      ...patientData,
      createdAt: serverTimestamp(), // Add a timestamp for when it was created
      lastUpdated: serverTimestamp()
    });
    console.log("New patient profile created with ID:", newDocRef.id);
    return newDocRef.id; // Return the new ID
  } catch (error) {
    console.error("Error creating patient profile: ", error);
  }
};

/**
 * Updates an EXISTING patient's medical profile using a known ID.
 * @param {string} patientId - The unique ID of the patient document.
 * @param {object} patientData - The patient's profile data to update.
 */
export const updatePatientProfile = async (patientId, patientData) => {
  try {
    const patientDocRef = doc(db, 'patients', patientId);
    await setDoc(patientDocRef, {
      ...patientData,
      lastUpdated: serverTimestamp()
    }, { merge: true });
    console.log("Patient profile updated successfully for ID:", patientId);
  } catch (error) {
    console.error("Error updating patient profile: ", error);
  }
};
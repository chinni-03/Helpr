// ZoneService.js
import { firestore } from '../Backend/FirebaseInitialization'; // Import firestore from FirebaseInitialization.js
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const zonesCollection = collection(firestore, "zones");

// Add zone to Firestore
export const addZoneDataToFirestore = async (zone) => {
  try {
    await addDoc(zonesCollection, zone); // Adds the zone data to the Firestore 'zones' collection
    console.log("Zone added successfully:", zone);
  } catch (error) {
    console.error("Error adding zone:", error);
    throw new Error("Error adding zone to Firestore");
  }
};

// Fetch both 'safe' and 'danger' zones from Firestore
export const fetchZonesFromFirestore = async () => {
  try {
    const zoneTypes = ["safe", "danger"]; // Ensure valid types

    // Create queries for both "safe" and "danger" zones
    const queries = zoneTypes.map(type =>
      query(zonesCollection, where("type", "==", type))
    );

    const allZones = [];

    // Fetch data for both zone types
    for (const zoneQuery of queries) {
      const snapshot = await getDocs(zoneQuery);
      snapshot.forEach((doc) => {
        allZones.push(doc.data());
      });
    }

    return allZones; // Returns an array containing both safe and danger zones
  } catch (error) {
    console.error("Error fetching zones:", error);
    throw new Error("Error fetching zones from Firestore");
  }
};

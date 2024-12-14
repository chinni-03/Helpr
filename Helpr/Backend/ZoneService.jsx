import { firestore } from '../Backend/FirebaseInitialization'; // Import firestore from FirebaseInitialization.js
import { collection, getDocs, addDoc } from 'firebase/firestore'; // Import addDoc

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
    const snapshot = await getDocs(zonesCollection);  // Fetch all documents from 'zones' collection
    const allZones = [];

    snapshot.forEach((doc) => {
      const zoneData = doc.data();
      // Ensure zone data contains a radius and default if not present
      const radius = zoneData.radius || 100;  // Default radius is 100 meters

      allZones.push({ ...zoneData, radius });
    });

    // Return all zones (both 'safe' and 'danger')
    return allZones; 
  } catch (error) {
    console.error("Error fetching zones:", error);
    throw new Error("Error fetching zones from Firestore");
  }
};

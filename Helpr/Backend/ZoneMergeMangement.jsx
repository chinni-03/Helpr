// Haversine formula to calculate distance between two geo points (in meters)
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of the Earth in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Distance in meters
};

// Utility function to check if two circles overlap or should merge
const isCircleOverlap = (circle1, circle2, threshold) => {
    const distance = haversineDistance(
        circle1.latitude,
        circle1.longitude,
        circle2.latitude,
        circle2.longitude
        
    );
    
    // The sum of the radii (distance between the edges)
    const radiusSum = circle1.radius + circle2.radius;
    
    // If the distance between the centers is less than or equal to the sum of the radii
    return distance <= radiusSum + threshold;
};

// Function to merge two overlapping circles into a larger circle
const mergeCircles = (circle1, circle2) => {
    // Calculate the distance between the centers of the two circles
    const distance = haversineDistance(
        circle1.latitude,
        circle1.longitude,
        circle2.latitude,
        circle2.longitude
    );

    // Calculate the new radius as the average of the two radii + half the distance between centers
    const newRadius = (circle1.radius + circle2.radius + distance) / 2;

    // Calculate the midpoint between the two circle centers
    const latitude = (circle1.latitude + circle2.latitude) / 2;
    const longitude = (circle1.longitude + circle2.longitude) / 2;

    // Retain the color from circle1 (or you can decide based on conditions)
    const color = circle1.type === "danger" ? "red" : "green";  // Keep color based on type

    return { latitude, longitude, radius: newRadius, color, type: circle1.type };  // Return the merged circle
};

// Function to merge overlapping zones
export const mergeOverlappingZones = (zones, threshold = 30) => {
    let mergedZones = [];
  
    zones.forEach((zone) => {
        let isMerged = false;
    
        // Check if this zone overlaps or should merge with any existing merged zone
        for (let i = 0; i < mergedZones.length; i++) {
            if (isCircleOverlap(mergedZones[i], zone, threshold)) {
                // Merge the two overlapping circles
                mergedZones[i] = mergeCircles(mergedZones[i], zone);
                isMerged = true;
                break;
            }
        }
    
        // If the zone did not overlap with any existing merged zone, add it as a new zone
        if (!isMerged) {
            mergedZones.push(zone);
        }
    });
  
    return mergedZones;
};

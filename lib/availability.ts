// Simulated availability data
// In a real app, this would come from an API

// Create random availability data for demonstration
const generateAvailabilityData = (speakerId: string) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  // Create an object to store availability for each month
  const availabilityByMonth: Record<number, Record<string, string>> = {};
  
  // Generate data for current month and next 12 months
  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    const month = (currentMonth + monthOffset) % 12;
    const year = currentYear + Math.floor((currentMonth + monthOffset) / 12);
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthAvailability: Record<string, string> = {};
    
    // For each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      
      // Skip dates in the past
      if (date < new Date()) {
        continue;
      }
      
      // Generate random availability status
      const random = Math.random();
      let status: string;
      
      if (random < 0.6) {
        status = 'available';  // 60% chance of being available
      } else if (random < 0.8) {
        status = 'tentative';  // 20% chance of being tentative
      } else {
        status = 'booked';     // 20% chance of being booked
      }
      
      monthAvailability[dateString] = status;
    }
    
    availabilityByMonth[month] = monthAvailability;
  }
  
  return availabilityByMonth;
};

// Cache for availability data
const availabilityCache: Record<string, Record<number, Record<string, string>>> = {};

// Get availability for a specific month
export const getAvailabilityForMonth = (
  speakerId: string, 
  month: number
): Record<string, string> => {
  // If we don't have data for this speaker, generate it
  if (!availabilityCache[speakerId]) {
    availabilityCache[speakerId] = generateAvailabilityData(speakerId);
  }
  
  // Return the availability for the requested month
  return availabilityCache[speakerId][month] || {};
};

// Check if a specific date is available
export const checkDateAvailability = (
  speakerId: string,
  date: Date
): string | null => {
  const month = date.getMonth();
  const dateString = date.toISOString().split('T')[0];
  
  // Get availability for the month
  const monthAvailability = getAvailabilityForMonth(speakerId, month);
  
  // Return status for the specific date
  return monthAvailability[dateString] || null;
};
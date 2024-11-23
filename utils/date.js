export const addDate = (date, days) => {
  try {
    // Create base date in EAT timezone
    const eatOffset = 3; // EAT is UTC+3
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    let baseDate = new Date(utc + (3600000 * eatOffset));

    // If a valid date is provided, use it instead
    if (date) {
      if (typeof date === 'string') {
        baseDate = new Date(date);
      } else if (date instanceof Date && !isNaN(date)) {
        baseDate = date;
      }
    }

    // Add the specified days
    baseDate.setDate(baseDate.getDate() + days);

    // Format as YYYY-MM-DD
    const year = baseDate.getFullYear();
    const month = String(baseDate.getMonth() + 1).padStart(2, '0');
    const day = String(baseDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error in addDate:', error);
    // Return today's date as fallback
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const eatDate = new Date(utc + (3600000 * 3)); // EAT offset
    
    const year = eatDate.getFullYear();
    const month = String(eatDate.getMonth() + 1).padStart(2, '0');
    const day = String(eatDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
};
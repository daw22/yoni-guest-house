export const addDate = (date = null, days = 0) => {
  try {
    let baseDate;

    // Handle different date input types
    if (date instanceof Date && !isNaN(date)) {
      // If it's a valid Date object
      baseDate = new Date(date);
    } else if (typeof date === 'string' && date.trim() !== '') {
      // If it's a date string from input (YYYY-MM-DD)
      baseDate = new Date(date);
    } else {
      // Default to current date
      baseDate = new Date();
    }

    // Validate the date
    if (isNaN(baseDate.getTime())) {
      throw new Error('Invalid date');
    }

    // Convert to UTC+3 (EAT)
    const utc = baseDate.getTime() + (baseDate.getTimezoneOffset() * 60000);
    baseDate = new Date(utc + (3 * 60 * 60 * 1000));

    // Add the specified number of days
    baseDate.setDate(baseDate.getDate() + Number(days));

    // Format as YYYY-MM-DD for input type="date"
    const year = baseDate.getFullYear();
    const month = String(baseDate.getMonth() + 1).padStart(2, '0');
    const day = String(baseDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    // Validate the final format
    if (!formattedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      throw new Error('Invalid date format');
    }

    return formattedDate;

  } catch (error) {
    console.error('Error in addDate:', error);
    // Return current EAT date as fallback
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const eatDate = new Date(utc + (3 * 60 * 60 * 1000));
    
    const year = eatDate.getFullYear();
    const month = String(eatDate.getMonth() + 1).padStart(2, '0');
    const day = String(eatDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
};
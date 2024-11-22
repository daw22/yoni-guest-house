export const addDate = (date, days) => {
  // Create a new date object for today
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0); // Reset time to midnight

  // If a valid date is provided, use it instead
  if (date && date instanceof Date && !isNaN(date)) {
    baseDate.setTime(date.getTime());
  }

  // Add the specified number of days
  baseDate.setDate(baseDate.getDate() + days);

  // Format the date as YYYY-MM-DD
  const year = baseDate.getFullYear();
  const month = String(baseDate.getMonth() + 1).padStart(2, '0');
  const day = String(baseDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
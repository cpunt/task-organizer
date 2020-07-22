function daysDiff(startDate, date) {
  const oneDay = 24 * 60 * 60 * 1000;
  const days = Math.round((date - startDate) / oneDay);

  return days;
}

function weeksDiff(startDate, date) {
  const days = daysDiff(startDate, date);
  const weeksDiff = Math.round(days / 7);

  return weeksDiff;
}

function monthsDiff(startDate, date) {
  const years = yearsDiff(startDate, date);
  const months = (years * 12) + (date.getMonth() - startDate.getMonth());

  return months;
}

function yearsDiff(startDate, date) {
  const years = date.getFullYear() - startDate.getFullYear();

  return years;
}

export { daysDiff, weeksDiff, monthsDiff, yearsDiff };

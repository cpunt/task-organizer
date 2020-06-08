import { daysDiff, weeksDiff, monthsDiff, yearsDiff } from './dateDiff.js';
import { setDateToTimeframe } from '../sharedFunctions.js';

function getDateIndex(timeframe, startDate, date) {
  let index;

  switch(timeframe) {
    case 'yearly':
      index = yearsDiff(startDate, date);
      break;
    case 'monthly':
      index = monthsDiff(startDate, date);
      break;
    case 'weekly':
      index = weeksDiff(startDate, date);
      break;
    case 'daily':
      index = daysDiff(startDate, date);
      break;
  }

  return index;
}

function getTaskDates(timeframe, startDate, endDate) {
  const taskDates = [];
  let currentDate = setDateToTimeframe(timeframe, startDate),
      year,
      month,
      day;

  while(currentDate <= endDate) {
    taskDates.push(currentDate);
    year = currentDate.getFullYear();
    month = currentDate.getMonth();
    day = currentDate.getDate();

    switch(timeframe) {
      case 'yearly':
        currentDate = new Date(year + 1, 0);
        break;
      case 'monthly':
        currentDate = new Date(year, month + 1);
        break;
      case 'weekly':
        currentDate = new Date(year, month, day + 7);
        break;
      case 'daily':
        currentDate = new Date(year, month, day + 1);
        break;
    }
  }

  return taskDates;
}

export { getDateIndex, getTaskDates };

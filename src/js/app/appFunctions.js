import { daysDiff, weeksDiff, monthsDiff, yearsDiff } from './dateDiff.js';

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

export { getDateIndex };

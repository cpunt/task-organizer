import { addZero } from '../sharedFunctions.js';

function dateOperatorTimeframe(timeframe, date, operator) {
  let year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate(),
      newDate;

  switch(timeframe) {
    case 'yearly':
      year = updateDate(year, operator, 1);
      break;
    case 'monthly':
      month = updateDate(month, operator, 1);
      break;
    case 'weekly':
      day = updateDate(day, operator, 7);
      break;
  }

  newDate = new Date(year, month, day);

  return newDate;
}

function updateDate(num1, operator, num2) {
  let result;
  switch(operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
  }

  return result;
}

function convertDateToInputString(date) {
  let year = date.getFullYear(),
      month = addZero(date.getMonth() + 1),
      day = addZero(date.getDate());

  return `${year}-${month}-${day}`;
}

function validDate(date, minDate, maxDate) {
  if(date.length == 0 || minDate.length == 0 || maxDate.length == 0) {
    return false;
  }

  date = new Date(date);
  minDate = new Date(minDate);
  maxDate = new Date(maxDate);

  if(date >= minDate && date <= maxDate) {
    return true;
  }

  return false;
}

export { dateOperatorTimeframe, convertDateToInputString, validDate };

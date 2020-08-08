import { daysDiff, weeksDiff, monthsDiff, yearsDiff } from './dateDiff.js';

function getDateIndex (timeframe, startDate, date) {
  let index;

  switch (timeframe) {
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

function currentDate () {
  let date = new Date(),
      day = addZero(date.getDate()),
      month = addZero(date.getMonth() + 1),
      year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

function addZero (num) {
  if(num < 10) {
    num = `0${num}`;
  }

  return num;
}

function setDateToTimeframe (timeframe, date) {
  if (timeframe == 'weekly') {
    if (date.getDay() == 0) {
      date.setDate(date.getDate() - 6) ;
    } else if (date.getDay() > 1){
      date.setDate((date.getDate() - date.getDay()) + 1) ;
    }
  }

  let year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate(),
      timeframeDate;

  switch (timeframe) {
    case 'yearly':
      timeframeDate = new Date(year, 0);
      break;
    case 'monthly':
      timeframeDate = new Date(year, month);
      break;
    default:
      timeframeDate = new Date(year, month, day);
      break;
  }

  return timeframeDate;
}

function formatDate (dateString) {
  let date = new Date(dateString),
      day = addZero(date.getDate()),
      month = addZero(date.getMonth() + 1),
      year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function convertToDate (seconds) {
  return new Date(seconds * 1000);
}

function setWeeklyDate (date) {
  if (date.getDay() == 0) {
    date.setDate(date.getDate() - 6) ;
  } else if (date.getDay() > 1){
    date.setDate((date.getDate() - date.getDay()) + 1) ;
  }

  return date;
}

export { getDateIndex, currentDate, addZero, setDateToTimeframe, formatDate, convertToDate, setWeeklyDate };

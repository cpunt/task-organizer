import { convertDateToInputString, dateOperatorTimeframe } from './newTaskFunctions.js';

function startDateMin () {
  let startDateMin;

  if (this.taskParent == null) {
    startDateMin = convertDateToInputString(new Date(2010, 0));
  } else {
    startDateMin = this.taskParent.time.startDate;
  }

  return startDateMin;
}

function startDateMax () {
  let startDateMax,
      date;

  if (this.taskParent == null) {
    const today = new Date();
    date = new Date(today.getFullYear() + 25, today.getMonth(), today.getDate());
  } else {
    date = new Date(this.taskParent.time.endDate);
  }

  startDateMax = convertDateToInputString(dateOperatorTimeframe(this.timeframe, date, '-'));

  return startDateMax;
}

function endDateMin () {
  let endDateMin,
      startDate = new Date(this.startDate),
      startDateMin = new Date(this.startDateMin);

  if (startDate > startDateMin) {
    endDateMin = dateOperatorTimeframe(this.timeframe, new Date(this.startDate), '+');
  } else {
    endDateMin = dateOperatorTimeframe(this.timeframe, new Date(this.startDateMin), '+');
  }

  return convertDateToInputString(endDateMin);
}

function endDateMax () {
  let endDateMax;

  if (this.taskParent == null) {
    let today = new Date();
    endDateMax = convertDateToInputString(new Date(today.getFullYear() + 25, today.getMonth(), today.getDate()));
  } else {
    endDateMax = this.taskParent.time.endDate;
  }

  return endDateMax;
}

export { startDateMin, startDateMax, endDateMin, endDateMax }

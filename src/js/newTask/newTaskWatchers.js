import { dateOperatorTimeframe, convertDateToInputString, validDate } from './newTaskFunctions.js';

function parentId(val) {
  if(val) {
    this.startDate = this.tasks[val].time.startDate;
  } else {
    this.startDate = convertDateToInputString(new Date());
  }
}

function task() {
  if(this.errors.task) {
    if(this.task.length >= 3 && this.task.length <= 50) {
      this.errors.task = false;
    }
  }
}

function description() {
  if(this.errors.description) {
    if(this.description.length <= 500) {
      this.errors.description = false;
    }
  }
}

function timeframe(val) {
  //Add timeframe to endDate
  if(this.errors.timeframe) {
    if(this.timeframe.length > 0) {
      this.errors.timeframe = false;
    }
  }

  this.endDate = convertDateToInputString(dateOperatorTimeframe(val, new Date(this.startDate), '+'));
}

function startDate(val) {
  if(this.errors.startDate) {
    if(validDate(this.startDate, this.startDateMin, this.startDateMax)) {
      this.errors.startDate = false;
    }
  }
  //Maybe only change if startDate + timeframe is more than endDate
  //Update end date
  this.endDate = convertDateToInputString(dateOperatorTimeframe(this.timeframe, new Date(val), '+'));
}

function endDate() {
  if(this.errors.endDate) {
    if(validDate(this.endDate, this.endDateMin, this.endDateMax)) {
      this.errors.endDate = false;
    }
  }
}

export { parentId, task, description, timeframe, startDate, endDate };

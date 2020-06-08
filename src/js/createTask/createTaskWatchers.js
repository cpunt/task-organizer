import { dateOperatorTimeframe, convertDateToInputString, validDate } from './createTaskFunctions.js';

function taskParent(val) {
  let options = ['yearly', 'monthly', 'weekly', 'daily'];
  if(val != null) {
    switch(val.time.timeframe) {
      case 'monthly':
        options = options.slice(1);
        break;
      case 'weekly':
        options = options.slice(2);
        break;
      case 'daily':
        options = options.slice(3);
        break;
    }
  }

  this.timeframe = '';
  this.timeframeOptions = options;
}

function task() {
  if(this.errors.task) {
    if(this.task.length >= 3 && this.task.length <= 50) {
      this.errors.task = false;
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

export { taskParent, task, timeframe, startDate, endDate };

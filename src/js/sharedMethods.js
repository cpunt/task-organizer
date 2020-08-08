import { validDate } from './newTask/newTaskFunctions.js';

function cancelByEsc (e) {
  if (e.keyCode == '27') {
    document.removeEventListener('keyup', this.cancelByEsc);
    this.cancel()
  }
}

function validateTasks () {
  let taskLen = this.task.trim().length;
  if (taskLen < 3 || taskLen > 50) {
    this.errors.task = true;
  }

  if (this.description.length > 500) {
    this.errors.description = true;
  }

  if (this.timeframe.length == 0) {
    this.errors.timeframe = true;
  }

  if (!validDate(this.startDate, this.startDateMin, this.startDateMax)) {
    this.errors.startDate = true;
  }

  if (!validDate(this.endDate, this.endDateMin, this.endDateMax)) {
    this.errors.endDate = true;
  }

  for (const property in this.errors) {
    if (this.errors[property]) {
      return false;
    }
  }

  return true;
}


export { cancelByEsc, validateTasks };

import { convertDateToInputString, validDate } from './newTaskFunctions.js';
// import { getDateIndex } from '../app/appFunctions.js';

function createTask() {
  if(this.validateTasks()) {
    // const dateTaskCompletedLen = getDateIndex(this.timeframe, new Date(this.startDate), new Date(this.endDate)) + 1,
    //       dateTaskCompleted = new Array(dateTaskCompletedLen)
    // dateTaskCompleted.fill(false, 0, dateTaskCompletedLen);

    const taskData = {
      children: [],
      dateTaskCompleted: {},
      description: this.description,
      parent: this.parentId,
      task: this.task,
      taskCompleted: false,
      time: {
        timeframe: this.timeframe,
        startDate: this.startDate,
        endDate: this.endDate
      }
    }

    let parentChildren = null;

    if(this.parentId) {
      parentChildren = this.tasks[this.parentId].children;
    }

    this.$store.dispatch('tasks/addTask', {
      task: taskData,
      parentChildren: parentChildren
    });

    this.cancel();
  }
}

function validateTasks() {
  let taskLen = this.task.trim().length;
  if(taskLen < 3 || taskLen > 50) {
    this.errors.task = true;
  }

  if(this.description.length > 500) {
    this.errors.description = true;
  }

  if(this.timeframe.length == 0) {
    this.errors.timeframe = true;
  }

  if(!validDate(this.startDate, this.startDateMin, this.startDateMax)) {
    this.errors.startDate = true;
  }

  if(!validDate(this.endDate, this.endDateMin, this.endDateMax)) {
    this.errors.endDate = true;
  }

  for(const property in this.errors) {
    if(this.errors[property]) {
      return false;
    }
  }

  return true;
}

function setStartDate() {
  if(this.taskParent == null) {
    this.startDate = convertDateToInputString(new Date());
  } else {
    this.startDate = this.taskParent.time.startDate;
  }
}

export { createTask, validateTasks, setStartDate };

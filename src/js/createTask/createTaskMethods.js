import { nodeDFS } from '../nodeFunctions.js';
import { convertDateToInputString, validDate } from './createTaskFunctions.js';
import { getDateIndex } from '../app/appFunctions.js';

function taskPaths() {
  let pathsList = [],
      map,
      root;

  for(let i = 0; i < this.tasks.length; i++) {
    root = this.tasks[i];

    nodeDFS(function(node) {
      map = {
        task: node,
        path: []
      };

      while(node != null) {
        map['path'].unshift(node.task);
        node = node.parent;
      }

      pathsList.push(map);
    }, root);
  }

  return pathsList;
}

function cancelTask() {
  this.$emit('cancel-new-task');
}

function createTask() {
  const dateTaskCompletedLen = getDateIndex(this.timeframe, new Date(this.startDate), new Date(this.endDate)) + 1;
  const dateTaskCompleted = new Array(dateTaskCompletedLen);
  dateTaskCompleted.fill(false, 0, dateTaskCompletedLen);

  const taskData = {
    taskParent: this.taskParent,
    taskData: {
      task: this.task,
      time: {
        timeframe: this.timeframe,
        startDate: this.startDate,
        endDate: this.endDate
      },
      dateTaskCompleted: dateTaskCompleted
    }
  }

  if(this.validateTasks()) {
    this.$emit('create-new-task', taskData);
  }
}

function validateTasks() {
  if(this.task.length < 3 || this.task.length > 50) {
    this.errors.task = true;
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

export { taskPaths, cancelTask, createTask, validateTasks, setStartDate };

import { nodeDFS } from '../nodeFunctions.js';
import { convertDateToInputString, validDate } from './newTaskFunctions.js';
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

function createTask() {
  if(this.validateTasks()) {
    const dateTaskCompletedLen = getDateIndex(this.timeframe, new Date(this.startDate), new Date(this.endDate)) + 1;
    const dateTaskCompleted = new Array(dateTaskCompletedLen);
    dateTaskCompleted.fill(false, 0, dateTaskCompletedLen);

    const taskData = {
      taskParent: this.taskParent,
      taskData: {
        task: this.task,
        description: this.description,
        time: {
          timeframe: this.timeframe,
          startDate: this.startDate,
          endDate: this.endDate
        },
        dateTaskCompleted: dateTaskCompleted
      }
    }

      this.$emit('create-task', taskData);
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

function updateTimeframe(val) {
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

  if(options.indexOf(this.timeframe) == -1) {
    this.timeframe = '';
  }

  this.timeframeOptions = options;
}

export { taskPaths, createTask, validateTasks, setStartDate, updateTimeframe };

import { Node, nodeDFS, addNode } from '../nodeFunctions.js';
import { getDateIndex, getTaskDates } from './appFunctions.js';

function updateTaskSelected(task) {
  this.taskselected = task;
}

function addNewTask() {
  this.newtask = true;
}

function cancelNewTask() {
  this.newtask = false;
}

function createNewTask(taskData) {
  let index;

  for(let i = 0; i < this.timeframes.length; i++) {
    if(taskData.taskData.time.timeframe == this.timeframes[i].timeframe) {
      index = i;
      break;
    }
  }

  if(!taskData.taskParent) {
    let root = new Node(taskData.taskData);
    this.roots.push(root);
    this.addTaskToTimeframe(root, index);

  } else {
    let taskRoot = taskData.taskParent;
    while(taskRoot.parent != null) {
      taskRoot = taskRoot.parent;
    }

    let newNode = addNode(taskRoot, taskData.taskData, taskData.taskParent.task, nodeDFS);

    newNode.parent.taskCompleted = false;

    if(newNode.parent.time.timeframe != newNode.time.timeframe) {
      this.addTaskToTimeframe(newNode, index);
    }
  }

  this.newtask = false;
}

function addTaskToTimeframe(root, index) {
  const timeframe = root.time.timeframe,
        startDate = new Date(root.time.startDate),
        endDate = new Date(root.time.endDate);

  let dates = this.timeframes[index].dates,
      datesLen = dates.length,
      firstDate = datesLen > 0 ? dates[0].date : null,
      lastDate = datesLen > 0 ? dates[datesLen - 1].date : null;

  //Adds all new dates
  if(datesLen == 0 || startDate < firstDate || endDate > lastDate) {
    let taskDates,
        dateMap = {};

    if(datesLen == 0) {
      //Add all dates from startDate to endDate
      taskDates = getTaskDates(timeframe, startDate, endDate);

      for(let i = 0; i < taskDates.length; i++) {
        dateMap['date'] = taskDates[i];
        dateMap['tasks'] = [];
        dates.push(dateMap);
        dateMap = {};
      }

      firstDate = dates[0].date;
    } else {
      if(startDate < firstDate) {
        //Add all dates from startDate to firstDate
        taskDates = getTaskDates(timeframe, startDate, firstDate);

        for(let i = taskDates.length - 1; i >= 0; i--) {
          dateMap['date'] = taskDates[i];
          dateMap['tasks'] = [];
          if(taskDates[i] < firstDate) {
            dates.unshift(dateMap);
          }
          dateMap = {};
        }
        firstDate = startDate;
      }

      if(endDate > lastDate) {
        //Add all dates from lastDate to endDate
        taskDates = getTaskDates(timeframe, lastDate, endDate);

        for(let i = 0; i < taskDates.length; i++) {
          dateMap['date'] = taskDates[i];
          dateMap['tasks'] = [];
          if(taskDates[i] > lastDate) {
            dates.push(dateMap);
          }
          dateMap = {};
        }
      }
    }
  }

  let startIndex = getDateIndex(timeframe, firstDate, startDate),
      endIndex = getDateIndex(timeframe, firstDate, endDate);

  //Add tasks to correct dates
  for(let i = startIndex; i <= endIndex; i++) {
    dates[i]['tasks'].push(root)
  }
}

export { updateTaskSelected, addNewTask, cancelNewTask, createNewTask, addTaskToTimeframe };

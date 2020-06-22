import { getDateIndex, getTaskDates } from '../app/appFunctions.js';
import { capitalizeFirstLetter, setDateToTimeframe } from '../sharedFunctions.js';
import { nodeDFS } from '../nodeFunctions.js';

function dates() {
  let datesArr = [];

  if(this.timeframeobj.tasks.length == 0) {
    return datesArr;
  }

  //Add dates
  let startDate = new Date(this.timeframeobj.tasks[0].time.startDate),
      endDate = new Date(this.timeframeobj.tasks[0].time.endDate),
      startDateTemp,
      endDateTemp;

  for(let i = 1; i < this.timeframeobj.tasks.length; i++) {
    startDateTemp = new Date(this.timeframeobj.tasks[i].time.startDate);
    endDateTemp = new Date(this.timeframeobj.tasks[i].time.endDate);

    if(startDateTemp < startDate) {
      startDate = startDateTemp;
    }

    if(endDateTemp > endDate) {
      endDate = endDateTemp;
    }
  }

  const taskDates = getTaskDates(this.timeframeobj.timeframe, startDate, endDate);
  let dateMap = {};

  for(let i = 0; i < taskDates.length; i++) {
    dateMap['date'] = taskDates[i];
    dateMap['tasks'] = [];
    datesArr.push(dateMap);
    dateMap = {};
  }
  //Add tasks
  let task,
      startDateIndex,
      endDateIndex;

  for(let i = 0; i < this.timeframeobj.tasks.length; i++) {
    task = this.timeframeobj.tasks[i];
    startDateIndex = getDateIndex(this.timeframeobj.timeframe, datesArr[0].date, new Date(task.time.startDate));
    endDateIndex = getDateIndex(this.timeframeobj.timeframe, datesArr[0].date, new Date(task.time.endDate));

    for(let j = startDateIndex; j <= endDateIndex; j++) {
      datesArr[j].tasks.push(task);
    }
  }

  return datesArr;
}

function timeframeHeader() {
  return capitalizeFirstLetter(this.timeframeobj.timeframe);
}

function validTasks() {
  let taskStartDate = this.date,
      timeframe = this.timeframe,
      startDate,
      endDate;

  taskStartDate.setHours(0,0,0,0);

  return this.tasks.filter(function(task) {
    if(task.time.timeframe == timeframe) {
      startDate = setDateToTimeframe(timeframe , new Date(task.time.startDate));
      endDate = setDateToTimeframe(timeframe , new Date(task.time.endDate));

      if(startDate <= taskStartDate && endDate >= taskStartDate) {
        return true;
      }
    }

    return false;
  });
}

function completedIndex() {
  return getDateIndex(this.timeframe, new Date(this.task.time.startDate), this.date);
}

function taskHasValidChild() {
  let childrenLen = this.task.children.length
  if(childrenLen > 0) {
    let time,
        startDate,
        endDate;

    for(let i = 0; i < childrenLen; i++) {
      time = this.task.children[i].time;
      if(this.timeframe == time.timeframe) {
        startDate = setDateToTimeframe(this.timeframe, new Date(time.startDate));
        endDate = setDateToTimeframe(this.timeframe, new Date(time.endDate));

        if(startDate <= this.date && endDate >= this.date) {
          return true;
        }
      }
    }
  }

  return false;
}

function leaves() {
  let counter = 0;

  nodeDFS(function(node) {
    if(node.children.length == 0) {
      counter++;
    }
  }, this.task);

  return counter;
}

function leavesCompleted() {
  let counter = 0;

  nodeDFS(function(node) {
    if(node.children.length == 0 && node.taskCompleted) {
      counter++;
    }
  }, this.task);

  return counter;
}

function percent() {
  let sum = (this.leavesCompleted / this.leaves) * 100;

  return sum;
}

function expired() {
  const endDate = setDateToTimeframe(this.timeframe, new Date(this.task.time.endDate));
  let date,
      currentDate;

  if(endDate.getTime() == this.date.getTime()) {
    date = new Date(this.task.time.endDate);
    currentDate = new Date();
  } else {
    currentDate = setDateToTimeframe(this.timeframe, new Date());
    date = this.date;
  }

  date.setHours(0,0,0,0);
  currentDate.setHours(0,0,0,0);

  if(currentDate > date) {
    return true;
  }

  return false;
}

export { dates, timeframeHeader, validTasks, completedIndex, taskHasValidChild, leaves, leavesCompleted, percent, expired };

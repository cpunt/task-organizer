import { getDateIndex } from '../app/appFunctions.js';
import { capitalizeFirstLetter, setDateToTimeframe } from '../sharedFunctions.js';
import { nodeDFS} from '../nodeFunctions.js';

function timeframeHeader() {
  return capitalizeFirstLetter(this.timeframe);
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
  const currentDate = setDateToTimeframe(this.timeframe, new Date());

  if(currentDate > this.date && !this.task.dateTaskCompleted[this.completedIndex]) {
    return true;
  }

  return false;
}

export { timeframeHeader, validTasks, completedIndex, taskHasValidChild, leaves, leavesCompleted, percent, expired };

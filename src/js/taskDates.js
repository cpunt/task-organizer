import { currentDate } from './sharedFunctions.js';
import { daysDiff, weeksDiff, monthsDiff, yearsDiff } from './dateDiff.js';

function addTaskToTimeframe(root) {
  let timeframe = root.time.timeframe,
      fromDate = new Date(root.time.fromDate),
      toDate = new Date(root.time.toDate);

  let index,
      datesLen,
      firstDate,
      lastDate,
      fromIndex,
      toIndex;


  for(let i = 0; i < this.timeframes.length; i++) {
    if(timeframe == this.timeframes[i].timeframe) {
      index = i;
      break;
    }
  }

  datesLen = this.timeframes[index]['dates'].length;

  if(datesLen > 0) {
    lastDate = new Date(this.timeframes[index]['dates'][datesLen - 1].date);
  }

  if(datesLen == 0 || lastDate < toDate) {
    let dateMap = {},
        startingDateToAdd,
        taskDates;

    if(datesLen == 0) {
      startingDateToAdd = new Date(currentDate());
      fromIndex = getDateIndex(timeframe, startingDateToAdd, fromDate),
      toIndex = getDateIndex(timeframe, startingDateToAdd, toDate);
    } else if(lastDate < toDate) {

      if(timeframe == 'weekly') {
        lastDate = getWeeklyDate(lastDate);
      }

      startingDateToAdd = getNextDate(timeframe, lastDate);
      firstDate = new Date(this.timeframes[index]['dates'][0]['date']);
      fromIndex = getDateIndex(timeframe, firstDate, fromDate),
      toIndex = getDateIndex(timeframe, firstDate, toDate);
      //Add tasks to dates which are already set
      while(fromIndex <= toIndex) {
        this.timeframes[index]['dates'][fromIndex]['tasks'].push(root);
        fromIndex++;
        if(fromIndex == datesLen) {
          break;
        }
      }
    }

    if(timeframe == 'weekly') {
      toIndex++;
    }

    taskDates = getTaskDates(timeframe, startingDateToAdd, toDate);
    //Create new dates
    for(let i = 0; i < taskDates.length; i++) {
      dateMap['date'] = taskDates[i];
      dateMap['tasks'] = [];
      //Add root to correct dates
      if((i + datesLen) >= fromIndex && (i + datesLen) <= toIndex) {
        dateMap['tasks'].push(root);
      }

      this.timeframes[index]['dates'].push(dateMap)
      dateMap = {};
    }
  } else {
    firstDate = new Date(this.timeframes[index]['dates'][0]['date']);
    fromIndex = getDateIndex(timeframe, firstDate, fromDate),
    toIndex = getDateIndex(timeframe, firstDate, toDate);

    for(let i = fromIndex; i <= toIndex; i++) {
      //Add task to each one of these time frames
      this.timeframes[index]['dates'][i]['tasks'].push(root);
    }
  }
}

function getDateIndex(timeframe, startDate, date) {
  let index;

  switch(timeframe) {
    case 'yearly':
      index = yearsDiff(startDate, date);
      break;
    case 'monthly':
      index = monthsDiff(startDate, date);
      break;
    case 'weekly':
      index = weeksDiff(startDate, date);
      break;
    case 'daily':
      index = daysDiff(startDate, date);
      break;
  }

  return index;
}

function getTaskDates(timeframe, fromDate, toDate) {
  const taskDates = [];
  let currentDate = fromDate;

  if(timeframe == 'weekly') {
    currentDate = getWeeklyDate(currentDate);
  }

  while(currentDate <= toDate) {
    taskDates.push(currentDate);

    currentDate = getNextDate(timeframe, currentDate);
  }

  return taskDates;
}

function getNextDate(timeframe, currentDate) {
  let year = currentDate.getFullYear(),
      month = currentDate.getMonth(),
      day = currentDate.getDate(),
      nextDate;

  switch(timeframe) {
    case 'yearly':
      nextDate = new Date(year + 1, 0);
      break;
    case 'monthly':
      nextDate = new Date(year, month + 1);
      break;
    case 'weekly':
      nextDate = new Date(year, month, day + 7);
      break;
    case 'daily':
      nextDate = new Date(year, month, day + 1);
      break;
  }

  return nextDate;
}

function getWeeklyDate(date) {
  if(date.getDay() == 0) {
    date.setDate(currentDate.getDate() - 6) ;
  } else if(date.getDay() > 1){
    date.setDate((date.getDate() - date.getDay()) + 1) ;
  }

  return date;
}

export { addTaskToTimeframe, getNextDate, getDateIndex };

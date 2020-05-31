import { addZero } from './sharedFunctions.js';

function getTasksInDates() {
  let arr = [],
      map = {},
      index,
      taskDates;

  for(let i = 0; i < this.tasks.length; i++) {
    taskDates = getTaskDates(this.timeframe, this.tasks[i].time.fromDate, this.tasks[i].time.toDate);
    for(let j = 0; j < taskDates.length; j++) {
      index = arr.findIndex( obj => obj['date'] == taskDates[j]);
      if(index == -1) {
        map['date'] = taskDates[j];
        map['tasks'] = [];
        map['tasks'].push(this.tasks[i]);
        arr.push(map);
        map = {};
      } else {
        arr[index]['tasks'].push(this.tasks[i]);
      }
    }
  }

  return arr;
}

function getTaskDates(timeframe, startDate, stopDate) {
  let taskDates;
  const fromDate = new Date(startDate);
  const toDate = new Date(stopDate);

  switch(timeframe) {
    case 'yearly':
      taskDates = getYearlyTaskDates(fromDate, toDate);
      break;
    case 'monthly':
      taskDates = getMonthlyTaskDates(fromDate, toDate);
      break;
    case 'weekly':
      taskDates = getWeeklyTaskDates(fromDate, toDate);
      break;
    case 'daily':
      taskDates = getDailyTaskDates(fromDate, toDate);
      break;
  }

  return taskDates;
}

function getYearlyTaskDates(fromDate, toDate) {
  const taskDates = [];
  let currentDate = fromDate,
      year;

  while(currentDate <= toDate) {
    year = currentDate.getFullYear();

    taskDates.push(`${year}`);

    currentDate = new Date(year + 1, 0);
  }

  return taskDates;
}

function getMonthlyTaskDates(fromDate, toDate) {
  const taskDates = [];
  let currentDate = fromDate,
      year,
      month;

  while(currentDate <= toDate) {
    year = currentDate.getFullYear();
    month = addZero(currentDate.getMonth() + 1);

    taskDates.push(`${month}/${year}`);
    currentDate = new Date(year, month);
  }

  return taskDates;
}

function getWeeklyTaskDates(fromDate, toDate) {
  const taskDates = [];
  let currentDate = fromDate,
      year,
      month,
      day;

  let nWDate,
      nWYear,
      nWMonth,
      nWDay;

  if(currentDate.getDay() == 0) {
    currentDate.setDate(currentDate.getDate() - 6) ;
  } else if(currentDate.getDay() > 1){
    currentDate.setDate((currentDate.getDate() - currentDate.getDay()) + 1) ;
  }

  while(currentDate <= toDate) {
    year = currentDate.getFullYear();
    month = currentDate.getMonth();
    day = currentDate.getDate();

    nWDate = new Date(year, month, day + 6);
    nWYear = nWDate.getFullYear();
    nWMonth = nWDate.getMonth();
    nWDay = nWDate.getDate();

    taskDates.push(`${addZero(day)}/${addZero(month + 1)}/${year} - ${addZero(nWDay)}/${addZero(nWMonth + 1)}/${nWYear}`);

    currentDate = nWDate;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return taskDates;
}

function getDailyTaskDates(fromDate, toDate) {
  const taskDates = [];
  let currentDate = fromDate,
      year,
      month,
      day;

  while(currentDate <= toDate) {
    year = currentDate.getFullYear();
    month = currentDate.getMonth();
    day = currentDate.getDate();

    taskDates.push(`${addZero(day)}/${addZero(month + 1)}/${year}`);

    currentDate = new Date(year, month, day + 1);
  }

  return taskDates;
}

// export { getYearlyTaskDates, getMonthlyTaskDates, getWeeklyTaskDates, getDailyTaskDates };
export { getTasksInDates };

import Vue from 'vue';
import { addZero } from './sharedFunctions.js';

function taskDate(date, timeframe) {
  const d = new Date(date);
  let day = addZero(d.getDate());
  let month = addZero(d.getMonth() + 1);
  let year = d.getFullYear();
  let week, dayWeek, monthWeek, yearWeek;

  switch(timeframe) {
    case 'yearly':
      return year;
      // break;
    case 'monthly':
      return `${month}/${year}`;
      // break;
    case 'weekly':
      week = new Date(year, month - 1, Number(day) + 7);
      dayWeek = addZero(week.getDate());
      monthWeek = addZero(week.getMonth() + 1);
      yearWeek = week.getFullYear();

      return `${day}/${month}/${year} - ${dayWeek}/${monthWeek}/${yearWeek}`;
      // break;
    case 'daily':
      return `${day}/${month}/${year}`;
      // break;
  }
}

function taskHasValidChildren(timeframe, date, children) {
  if(children.length > 0) {
    let tasksDateStart = date,
        fromDate,
        toDate;

    for(let i = 0; i < children.length; i++) {
      if(timeframe == children[i].time.timeframe) {
        fromDate = getCurrentDate(timeframe, new Date(children[i].time.fromDate));
        toDate = getCurrentDate(timeframe, new Date(children[i].time.toDate));

        if(fromDate <= tasksDateStart && toDate >= tasksDateStart) {
          return true;
        }
      }
    }
  }

  return false;
}

function getCurrentDate(timeframe, date) {
  if(timeframe == 'weekly') {
    if(date.getDay() == 0) {
      date.setDate(currentDate.getDate() - 6) ;
    } else if(date.getDay() > 1){
      date.setDate((date.getDate() - date.getDay()) + 1) ;
    }
  }

  let year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate(),
      currentDate;

  switch(timeframe) {
    case 'yearly':
      currentDate = new Date(year, 0);
      break;
    case 'monthly':
      currentDate = new Date(year, month);
      break;
    case 'weekly':
      currentDate = new Date(year, month, day);
      break;
    case 'daily':
      currentDate = new Date(year, month, day);
      break;
  }

  return currentDate;
}

function toggleChildren(index) {
  Vue.set(this.showChildren, index, !this.showChildren[index]);
}

export { taskDate, taskHasValidChildren,  toggleChildren, getCurrentDate };

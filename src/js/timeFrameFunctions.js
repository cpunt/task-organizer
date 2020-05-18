import Vue from 'vue';
import { addZero } from '../js/sharedFunctions.js';

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

function displayTaskList(task) {
  if(task.children.length == 0) {
    return false;
  }

  for(let i = 0; i < task.children.length; i++) {
    if(task.time.timeFrame == task.children[i].time.timeFrame) {
      return true;
    }
  }

  return false;
}

function toggleChildren(index) {
  Vue.set(this.showChildren, index, !this.showChildren[index]);
}

function orderTasksByDate() {
  this.tasks = this.tasks.sort(function(a, b) {
    let fromDate1 = new Date(a.time.fromDate);
    let fromDate2 = new Date(b.time.fromDate);

    if(fromDate1.getTime() == fromDate2.getTime()) {
      let toDate1 = new Date(a.time.toDate);
      let toDate2 = new Date(b.time.toDate);

      return toDate1 - toDate2;
    }

    return fromDate1 - fromDate2;
  });
}

function createShowChildrenArray() {
  for(let i = 0; i < this.tasks.length; i++) {
    this.showChildren.push(false);
  }
}

export { taskDate, displayTaskList,  toggleChildren, orderTasksByDate, createShowChildrenArray };

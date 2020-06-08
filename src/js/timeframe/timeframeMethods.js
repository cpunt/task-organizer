import Vue from 'vue';
import { addZero } from '../sharedFunctions.js';

function taskDate(date) {
  const d = new Date(date);
  let day = addZero(d.getDate());
  let month = addZero(d.getMonth() + 1);
  let year = d.getFullYear();
  let week, dayWeek, monthWeek, yearWeek;

  switch(this.timeframe) {
    case 'yearly':
      return year;
    case 'monthly':
      return `${month}/${year}`;
    case 'weekly':
      week = new Date(year, month - 1, Number(day) + 6);
      dayWeek = addZero(week.getDate());
      monthWeek = addZero(week.getMonth() + 1);
      yearWeek = week.getFullYear();

      return `${day}/${month}/${year} - ${dayWeek}/${monthWeek}/${yearWeek}`;
    case 'daily':
      return `${day}/${month}/${year}`;
  }
}

function displayTask(task) {
  if(this.taskselected.length == 0) {
    return true;
  }

  while(task.parent != null) {
    task = task.parent;
  }

  return this.taskselected == task.task;
}

function toggleDateTaskCompleted() {
  Vue.set(this.task.dateTaskCompleted, this.completedIndex, !this.task.dateTaskCompleted[this.completedIndex]);

  for(let i = 0; i < this.task.dateTaskCompleted.length; i++) {
    if(!this.task.dateTaskCompleted[i]) {
      this.task.taskCompleted = false;
      return;
    }
  }

  this.task.taskCompleted = true;
}

function toggleTaskCompleted() {
  this.task.taskCompleted = !this.task.taskCompleted;
}

function toggleShowChildren() {
  this.showChildren = !this.showChildren;
}

export { taskDate, displayTask, toggleDateTaskCompleted, toggleTaskCompleted, toggleShowChildren };

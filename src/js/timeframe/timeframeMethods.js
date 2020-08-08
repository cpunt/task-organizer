import { addZero } from '../sharedFunctions.js';

function taskDate (date) {
  const d = new Date(date);
  let day = addZero(d.getDate());
  let month = addZero(d.getMonth() + 1);
  let year = d.getFullYear();
  let week, dayWeek, monthWeek, yearWeek;

  switch (this.timeframe) {
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

function toggleShowChildren () {
  this.showChildren = !this.showChildren;
}

export { taskDate, toggleShowChildren };

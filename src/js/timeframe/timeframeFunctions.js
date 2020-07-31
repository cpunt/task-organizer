import { setDateToTimeframe } from '../sharedFunctions.js';

function getTaskDates(taskIds, tasks, timeframe) {
  const taskDates = [];
  let minDate = new Date(Math.min.apply(null, taskIds.map(taskId => new Date(tasks[taskId].time.startDate))));
  let maxDate = new Date(Math.max.apply(null, taskIds.map(taskId => new Date(tasks[taskId].time.endDate))));
  let currentDate, year, month, day;
  currentDate = setDateToTimeframe(timeframe, minDate);

  while(currentDate <= maxDate) {
    taskDates.push({
      date: currentDate,
      tasks: []
    });
    year = currentDate.getFullYear();
    month = currentDate.getMonth();
    day = currentDate.getDate();

    switch(timeframe) {
      case 'yearly':
        currentDate = new Date(year + 1, 0);
        break;
      case 'monthly':
        currentDate = new Date(year, month + 1);
        break;
      case 'weekly':
        currentDate = new Date(year, month, day + 7);
        break;
      case 'daily':
        currentDate = new Date(year, month, day + 1);
        break;
    }
  }

  return taskDates;
}

export { getTaskDates };

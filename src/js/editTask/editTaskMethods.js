import { getDateIndex } from '../app/appFunctions.js';

function validateChildrenDates() {
  if(this.taskobj.children.length > 0) {
    if(this.taskobj.time.startDate != this.startDate || this.taskobj.time.endDate != this.endDate) {
      const startDate = new Date(this.startDate),
            endDate = new Date(this.endDate);

      let child,
          childStartDate,
          childEndDate;

      for(let i = 0; i < this.taskobj.children.length; i++) {
        child = this.tasks[this.taskobj.children[i]];
        childStartDate = new Date(child.time.startDate);
        childEndDate = new Date(child.time.endDate);

        if(startDate > childStartDate || endDate < childEndDate) {
          //Error msg
          alert("Subtask dates greater than parent dates. Unable to change dates.");

          //Change startDate and endDate back to default
          this.startDate = this.taskobj.time.startDate;
          this.endDate = this.taskobj.time.endDate;

          return false;
        }
      }
    }
  }

  return true;
}

function updateTask() {
  const validTasks = this.validateTasks(),
        validChildrenDates = this.validateChildrenDates();

  if(validTasks && validChildrenDates) {
    const dateTaskCompleted = this.getDateTaskCompleted(),
          taskCompleted = this.getTaskCompleted(dateTaskCompleted);

    const task = {
      task: this.task,
      description: this.description,
      time: {
        timeframe: this.timeframe,
        startDate: this.startDate,
        endDate: this.endDate
      },
      dateTaskCompleted: dateTaskCompleted,
      taskCompleted: taskCompleted,
    }

    this.updateTaskDB(task, this.taskid);
    this.cancel();
  }
}

function getDateTaskCompleted() {
  const timeframe = this.taskobj.time.timeframe,
        dateTaskCompleted = this.taskobj.dateTaskCompleted,
        startDate = new Date(this.taskobj.time.startDate),
        endDate = new Date(this.taskobj.time.endDate),
        newStartDate = new Date(this.startDate),
        newEndDate = new Date(this.endDate);

  let startIndex = getDateIndex(timeframe, startDate, newStartDate),
      endIndex = getDateIndex(timeframe, endDate, newEndDate);

  if(startIndex > 0) {
    while(startIndex > 0) {
      startIndex--;
      dateTaskCompleted.shift();
    }
  } else if(startIndex < 0) {
    while(startIndex < 0) {
      startIndex++;
      dateTaskCompleted.unshift(false);
    }
  }

  if(endIndex > 0) {
    while(endIndex > 0) {
      endIndex--;
      dateTaskCompleted.push(false);
    }
  } else if(endIndex < 0) {
    while(endIndex < 0) {
      endIndex++;
      dateTaskCompleted.pop();
    }
  }

  return dateTaskCompleted;
}

function getTaskCompleted(dateTaskArr) {
  for(let i = 0; i < dateTaskArr.length; i++) {
    if(dateTaskArr[i] == false) {
      return false;
    }
  }

  return true;
}

function cancelEdit() {
  this.$parent.toggleEdit();
}

export { validateChildrenDates, updateTask, getDateTaskCompleted, getTaskCompleted, cancelEdit };

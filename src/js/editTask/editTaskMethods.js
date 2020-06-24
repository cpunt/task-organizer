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
        child = this.taskobj.children[i];
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
    if(this.taskobj.task != this.task) {
      this.taskobj.task = this.task;
    }

    if(this.taskobj.description != this.description) {
      this.taskobj.description = this.description;
    }

    if(this.taskobj.time.timeframe != this.timeframe) {
      this.taskobj.time.timeframe = this.timeframe;
    }

    if(this.taskobj.time.endDate != this.endDate || this.taskobj.time.startDate != this.startDate) {
      this.updateDateTaskCompleted();
    }

    if(this.taskobj.time.startDate != this.startDate) {
      this.taskobj.time.startDate = this.startDate;
    }

    if(this.taskobj.time.endDate != this.endDate) {
      this.taskobj.time.endDate = this.endDate;
    }

    this.cancel();
  }
}

function updateDateTaskCompleted() {
  const timeframe = this.taskobj.time.timeframe,
        startDate = new Date(this.taskobj.time.startDate),
        endDate = new Date(this.taskobj.time.endDate),
        newStartDate = new Date(this.startDate),
        newEndDate = new Date(this.endDate);


  let startIndex = getDateIndex(timeframe, startDate, newStartDate),
      endIndex = getDateIndex(timeframe, endDate, newEndDate);

  if(startIndex > 0) {
    while(startIndex > 0) {
      startIndex--;
      this.taskobj.dateTaskCompleted.shift();
    }
  } else if(startIndex < 0) {
    while(startIndex < 0) {
      startIndex++;
      this.taskobj.dateTaskCompleted.unshift(false);
    }
  }

  if(endIndex > 0) {
    while(endIndex > 0) {
      endIndex--;
      this.taskobj.dateTaskCompleted.push(false);
    }
  } else if(endIndex < 0) {
    while(endIndex < 0) {
      endIndex++;
      this.taskobj.dateTaskCompleted.pop();
    }
  }

  let dateTaskArr = this.taskobj.dateTaskCompleted

  for(let i = 0; i < dateTaskArr.length; i++) {
    if(dateTaskArr[i] == false) {
      this.taskobj.taskCompleted = false;
      return;
    }
  }

  this.taskobj.taskCompleted = true;
}

function cancelEdit() {
  this.$parent.toggleEdit();
}

export { validateChildrenDates, updateTask, updateDateTaskCompleted, cancelEdit };

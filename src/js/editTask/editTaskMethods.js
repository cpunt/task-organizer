function validateChildrenDates () {
  if (this.taskobj.children.length > 0) {
    if( this.taskobj.time.startDate != this.startDate || this.taskobj.time.endDate != this.endDate) {
      const startDate = new Date(this.startDate),
            endDate = new Date(this.endDate);

      let child,
          childStartDate,
          childEndDate;

      for (let i = 0; i < this.taskobj.children.length; i++) {
        child = this.tasks[this.taskobj.children[i]];
        childStartDate = new Date(child.time.startDate);
        childEndDate = new Date(child.time.endDate);

        if (startDate > childStartDate || endDate < childEndDate) {
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

function updateTask () {
  const validTasks = this.validateTasks(),
        validChildrenDates = this.validateChildrenDates();

  if (validTasks && validChildrenDates) {
    const task = {
      task: this.task,
      description: this.description,
      time: {
        timeframe: this.timeframe,
        startDate: this.startDate,
        endDate: this.endDate
      }
    }

    this.$store.dispatch('tasks/updateTask', { task: task, taskId: this.taskId});
    this.cancel();
  }
}


function getTaskCompleted (dateTaskArr) {
  for (let i = 0; i < dateTaskArr.length; i++) {
    if (dateTaskArr[i] == false) {
      return false;
    }
  }

  return true;
}

function cancelEdit () {
  this.$parent.toggleEdit();
}

export { validateChildrenDates, updateTask, getTaskCompleted, cancelEdit };

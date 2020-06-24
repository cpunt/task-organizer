function addTask() {
  this.$emit('add-task', this.task);
}

function cancel() {
  this.$emit('cancel');
}

function cancelByEsc(e) {
  if(e.keyCode == '27') {
    document.removeEventListener('keyup', this.cancelByEsc);
    this.cancel()
  }
}

function confirmDeleteTask() {
  this.$emit('confirm-delete-task', this.task);
}

export { addTask, cancel, cancelByEsc, confirmDeleteTask };

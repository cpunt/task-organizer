function addTask(taskId) {
  this.$store.commit('SET_DISPLAY', { vtask: false, ntask: true, dtask: false, bgScreen: true })
  this.$store.commit('SET_TASKID', { taskId: taskId})
}

function cancel() {
  this.$store.commit('SET_DISPLAY', { vtask: false, ntask: false, dtask: false, bgScreen: false })
  this.$store.commit('SET_TASKID', { taskId: ''})
}

function cancelByEsc(e) {
  if(e.keyCode == '27') {
    document.removeEventListener('keyup', this.cancelByEsc);
    this.cancel()
  }
}

function confirmDeleteTask(taskId) {
  this.$store.commit('SET_DISPLAY', { vtask: false, dtask: true, bgScreen: true });
  this.$store.commit('SET_TASKID', { taskId: taskId})
}

export { addTask, cancel, cancelByEsc, confirmDeleteTask };

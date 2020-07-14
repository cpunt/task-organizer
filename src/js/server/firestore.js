import { db } from './config.js'

function getTasksDB() {
  db.collection('tasks')
    .onSnapshot((querySnapshot) => {
      console.log('Im doing something');

      querySnapshot.docChanges().forEach(change => {
        // console.log(change.type);
        // console.log(change.doc.data());
        if(change.type === 'added' || change.type === 'modified') {
          if(!change.doc.data().parent) {
            this.$store.commit('SET_ROOT', { id: change.doc.id });
          }
          this.$store.commit('SET_TASK', { id: change.doc.id, task: change.doc.data() });
        }
      });
    });
}

function getSidebarDB() {
  db.collection('sidebar')
    .doc('sidebar')
    .onSnapshot((querySnapshot) => {
      const data = querySnapshot.data();
      this.$store.commit('SET_SIDEBAR', { taskSelected: data.taskSelected });
    });
}

function updateTaskSelectedDB(event) {
  const taskSelected = event.target.value;
  db.collection('sidebar')
    .doc('sidebar')
    .update({
      taskSelected: taskSelected
    });
}

function updateTaskDB(task, taskid) {
  db.collection('tasks')
    .doc(taskid)
    .update(task);
}

function updateDateTaskCompletedDB() {
  const dates = this.task.dateTaskCompleted;
  dates[this.completedIndex] = !dates[this.completedIndex];

  db.collection('tasks')
    .doc(this.taskid)
    .update({
      dateTaskCompleted: dates
    });

  const taskComplete = dates.every((val) => val === true);

  if(taskComplete != this.task.taskCompleted) {
    updateTaskCompletedDB(taskComplete, this.taskid);
  }
}

function updateTaskCompletedDB(taskComplete, taskid) {
  db.collection('tasks')
    .doc(taskid)
    .update({
      taskCompleted: taskComplete
    });
}

function addTaskDB(task, parentChildren) {
  if(task.parent) {
    db.collection('tasks')
      .add(task)
      .then((docRef) => {
        parentChildren.push(docRef.id);
        db.collection('tasks')
          .doc(task.parent)
          .update({
            children: parentChildren
          });
      });
  } else {
    db.collection('tasks')
      .add(task);
  }
}

function deleteTaskDB() {
  const parentId = this.tasks[this.taskId].parent;
  const toDelete = getToDelete(this.tasks, this.taskId);

  //Delete task from parent task (send Children?)
  if(parentId) {
    let parentChildren = this.tasks[parentId].children,
        index = parentChildren.indexOf(this.taskId);

    parentChildren.splice(index, 1);

    db.collection('tasks')
      .doc(parentId)
      .update({
        children: parentChildren
      });
  }
  // Delete Task and children tasks
  toDelete.forEach(id => {
    db.collection('tasks')
      .doc(id)
      .delete();

    this.$store.commit('DELETE_TASK', { id: id });
  });
}

function getToDelete(tasks, taskId) {
  let currentId;
  const toDelete = [],
        queue = [];

  queue.push(taskId);
  currentId = queue.pop();

  while(currentId) {
    let children = tasks[currentId].children;

    children.forEach(child => {
      queue.push(child);
    });

    toDelete.push(currentId);
    currentId = queue.pop();
  }

  return toDelete;
}

export { getTasksDB, getSidebarDB, updateTaskSelectedDB, updateTaskDB, updateDateTaskCompletedDB, updateTaskCompletedDB, addTaskDB, deleteTaskDB };

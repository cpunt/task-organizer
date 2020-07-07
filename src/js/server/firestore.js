import { db } from './config.js'

function getTasksDB() {
  db.collection('tasks')
    .onSnapshot((querySnapshot) => {
      this.roots = [];
      this.tasks = {};
      console.log('Im doing something');
      querySnapshot.forEach((doc) => {
        if(!doc.data().parent) {
          this.roots.push(doc.id);
        }
        this.tasks[doc.id] = doc.data();
      });
    });
}

function getSidebarDB() {
  db.collection('sidebar')
    .doc('sidebar')
    .onSnapshot((querySnapshot) => {
      const data = querySnapshot.data();
      this.taskselected = data.taskSelected;
    });
}

function updateTaskSelectedDB(taskid) {
  db.collection('sidebar')
    .doc('sidebar')
    .update({
      taskSelected: taskid
    });
}

function updateTaskDB(task, taskid) {
  db.collection('tasks')
    .doc(taskid)
    .update(task);
}

// Change to db and get rid of toggle methods
function updateDateTaskCompleted(dateArr, taskid) {
  db.collection('tasks')
    .doc(taskid)
    .update({
      dateTaskCompleted: dateArr
    });
}
// Change to db and get rid of toggle methods
function updateTaskCompleted(taskComplete, taskid) {
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

function deleteTaskDB(tasks, taskid, parentid) {
  //Delete task from parent task (send Children?)
  if(parentid) {
    let parent = tasks[parentid],
        parentChildren = parent.children,
        index = parentChildren.indexOf(taskid);

    parentChildren.splice(index, 1);

    db.collection('tasks')
      .doc(parentid)
      .update({
        children: parentChildren
      });
  }
  // Delete Task and children tasks
  let currentId;
  const toDelete = [],
        queue = [];

  queue.push(taskid);
  currentId = queue.pop();

  while(currentId) {
    let children = tasks[currentId].children;

    children.forEach(child => {
      queue.push(child);
    });

    toDelete.push(currentId);
    currentId = queue.pop();
  }

  toDelete.forEach(item => {
    db.collection('tasks')
      .doc(item)
      .delete();
  })
}

export { getTasksDB, getSidebarDB, updateTaskSelectedDB, updateTaskDB, updateDateTaskCompleted, updateTaskCompleted, addTaskDB, deleteTaskDB };

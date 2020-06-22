import { Node, nodeDFS, addNode, removeNode } from '../nodeFunctions.js';

function updateTaskSelected(task) {
  this.taskselected = task;
}

function addNewTask() {
  this.newtask = true;
}

function cancelNewTask() {
  this.newtasknode = null;
  this.newtask = false;
}

function createNewTask(taskData) {
  if(!taskData.taskParent) {
    let root = new Node(taskData.taskData);
    this.roots.push(root);
  } else {
    let taskRoot = taskData.taskParent;
    while(taskRoot.parent != null) {
      taskRoot = taskRoot.parent;
    }

    let newNode = addNode(taskRoot, taskData.taskData, taskData.taskParent.task, nodeDFS);
    newNode.parent.taskCompleted = false;
  }

  this.newtasknode = null;
  this.newtask = false;
}

function viewTask(task) {
  this.task = task;
}

function deleteTask(task) {
  if(task.parent == null) {
    for(let i = 0; i < this.roots.length; i++) {
      if(this.roots[i].task == task.task) {
        this.roots.splice(i, 1);
      }
    }
  } else {
    let taskRoot = task.parent;
    while(taskRoot.parent != null) {
      taskRoot = taskRoot.parent;
    }

    removeNode(taskRoot, task.task, nodeDFS);
  }

  this.task = null;
}

export { updateTaskSelected, addNewTask, cancelNewTask, createNewTask, viewTask, deleteTask };

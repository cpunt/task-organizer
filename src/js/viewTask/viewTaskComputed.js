import { nodeDFS } from '../nodeFunctions.js';

function getSubTasks() {
  const tasks = [],
        currentTask = this.task.task;

  nodeDFS(function(node) {
    if(node.task != currentTask && node.children.length == 0) {
      tasks.push(node);
    }
  }, this.task, this.tasks);

  return tasks;
}

export { getSubTasks };

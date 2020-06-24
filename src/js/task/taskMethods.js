import { nodeBFS } from '../nodeFunctions.js';

function viewTask() {
  this.$emit('view-task', this.task);
}

function highlightTasks() {
  if(!this.task.highlight) {
    let parent = this.task.parent;
    while(parent != null) {
      parent.highlight = true;
      parent = parent.parent;
    }

    nodeBFS(function(node) {
      node.highlight = true;
    }, this.task);
  }
}

function unhighlightTasks() {
  if(this.task.highlight) {
    let parent = this.task.parent;
    while(parent != null) {
      parent.highlight = false;
      parent = parent.parent;
    }

    nodeBFS(function(node) {
      node.highlight = false;
    }, this.task);
  }
}

export { viewTask, highlightTasks, unhighlightTasks };

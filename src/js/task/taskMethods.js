function viewTask() {
  this.$emit('view-task', this.taskid);
}

function highlightTasks() {
  const task = this.tasks[this.taskid];
  if(!('highlight' in task) || !task.highlight) {
    let parentid = task.parent,
        parent;

    while(parentid) {
      parent = this.tasks[parentid];
      this.$set(parent, 'highlight', true);
      this.tasks[parentid]['highlight'] = true;

      parentid = parent.parent;
    }
  }

  // if(!this.task.highlight) {
  //   let parent = this.task.parent;
  //   while(parent != null) {
  //     parent.highlight = true;
  //     parent = parent.parent;
  //   }
  //
  //   nodeBFS(function(node) {
  //     node.highlight = true;
  //   }, this.task);
  // }
}

function nodeBFS(callback, node) {
  let queue = [];

  queue.push(node);

  let currentNode = queue.pop();

  while(currentNode) {

    let length = currentNode.children.length;

    for(let i = 0; i < length; i++) {
      queue.unshift(currentNode.children[i]);
    }

    callback(currentNode);

    currentNode = queue.pop();
  }
}

function unhighlightTasks() {
  if(this.task.highlight) {
    let parent = this.task.parent;
    while(parent) {
      parent.highlight = false;
      parent = parent.parent;
    }

    nodeBFS(function(node) {
      node.highlight = false;
    }, this.task);
  }
}

export { viewTask, highlightTasks, unhighlightTasks };

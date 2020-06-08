function Node(taskData) {
  this.task = taskData.task;
  this.time = taskData.time;
  this.dateTaskCompleted = taskData.dateTaskCompleted;
  this.taskCompleted = false;
  this.parent = null;
  this.children = [];
}

function nodeDFS(callback, currentNode) {
  callback(currentNode);

  for(let i = 0; i < currentNode.children.length; i++) {
    nodeDFS(callback, currentNode.children[i]);
  }
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

function containsNode(callback, start, traversal) {
  traversal(callback, start);
}

function addNode(start, task, parentTask, traversal) {
  let child = new Node(task),
      parent = null;

  containsNode(function(node) {
    if(node.task == parentTask) {
      parent = node;
    }
  }, start, traversal);

  if(parent) {
    parent.children.push(child);
    child.parent = parent;
    return child;
  } else {
    //If parent node not found we throw an error
    throw new Error('Cannot add node to a non-existent parent.');
  }
}

function removeNode(start, task, traversal) {
  let parent = null,
      childToRemove = null,
      index;

  containsNode(function(node) {
    if(node.task == task) {
      parent = node.parent;
    }
  }, start, traversal);

  if(parent) {
    for(let i = 0; i < parent.children.length; i++) {
      if(parent.children[i].task == task) {
        index = i;
        break;
      }
    }

    childToRemove = parent.children.splice(index, 1);
  } else {
    throw new Error('Node does not exist');
  }

  return childToRemove;
}

export { Node, nodeDFS, nodeBFS, containsNode, addNode, removeNode };

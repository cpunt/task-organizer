function nodeDFS(callback, currentNode, tasks) {
  let childNode;

  callback(currentNode);

  for(let i = 0; i < currentNode.children.length; i++) {
    childNode = tasks[currentNode.children[i]];
    nodeDFS(callback, childNode, tasks);
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

export { nodeDFS, nodeBFS };

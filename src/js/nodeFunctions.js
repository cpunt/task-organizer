function nodeDFS (callback, currentNode, tasks) {
  let childNode;

  callback(currentNode);

  for (let i = 0; i < currentNode.children.length; i++) {
    childNode = tasks[currentNode.children[i]];
    nodeDFS(callback, childNode, tasks);
  }
}

export { nodeDFS };

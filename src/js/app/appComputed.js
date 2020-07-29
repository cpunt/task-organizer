/*
function timeframes() {
  let timeframesObj = [
    {
      timeframe: 'yearly',
      tasks: []
    },
    {
      timeframe: 'monthly',
      tasks: []
    },
    {
      timeframe: 'weekly',
      tasks: []
    },
    {
      timeframe: 'daily',
      tasks: []
    }
  ];

  let index = {
    yearly: 0,
    monthly: 1,
    weekly: 2,
    daily: 3
  };

  bfs(function(id, nodeTimeframe, parentTimeframe) {
    if(!parentTimeframe || parentTimeframe != nodeTimeframe) {
      timeframesObj[index[nodeTimeframe]].tasks.push(id);
    }
  }, this.roots, this.tasks);

  return timeframesObj;
}

function bfs(callback, roots, tasks) {
  let queue, currentId, currentNode, len, parentTimeframe;

  for(let i = 0; i < roots.length; i++) {
    queue = [];
    queue.push(roots[i]);
    currentId = queue.pop();
    currentNode = tasks[currentId];

    while(currentNode) {
      len = currentNode.children.length;
      parentTimeframe = currentNode.parent ? tasks[currentNode.parent].time.timeframe : '';

      for(let i = 0; i < len; i++) {
        queue.unshift(currentNode.children[i]);
      }

      callback(currentId, currentNode.time.timeframe, parentTimeframe);

      currentId = queue.pop();
      currentNode = tasks[currentId];
    }
  }
}

export { timeframes };
*/

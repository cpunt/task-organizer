import { nodeDFS } from '../nodeFunctions.js';

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

  for(let i = 0; i < this.roots.length; i++) {
    nodeDFS(function(node) {
      if(node.parent == null || node.parent.time.timeframe != node.time.timeframe) {
        timeframesObj[index[node.time.timeframe]].tasks.push(node);
      }
    }, this.roots[i]);
  }

  return timeframesObj;
}

export { timeframes };

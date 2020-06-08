import { getDateIndex } from './app/appFunctions';

function scrollToDate() {
  const tasksDiv = document.getElementsByClassName('tasksDiv');

  if(this.dateSelected.length == 0) {
    for(let i = 0; i < tasksDiv.length; i++) {
      tasksDiv[i].scrollTo(0, 0);
    }
  } else {
    let date = new Date(this.dateSelected),
        timeframeObj,
        index,
        node,
        len;

    for(let i = 0; i < this.timeframes.length; i++) {
      timeframeObj = this.timeframes[i];
      len = timeframeObj['dates'].length;
      if(len > 0) {
        index = getDateIndex(timeframeObj['timeframe'], timeframeObj['dates'][0].date, date);
        if(index < 0) {
          //Scroll to top
          tasksDiv[i].scrollTo(0, 0);
        } else if(index >= len) {
          //Scroll to bottom
          node = tasksDiv[i].querySelectorAll('.tasksDateDiv')[len - 1];
          tasksDiv[i].scrollTo(0, node.offsetTop - 76);
        } else {
          //Scroll to node
          node = tasksDiv[i].querySelectorAll('.tasksDateDiv')[index];
          tasksDiv[i].scrollTo(0, node.offsetTop - 76);
        }
      }
    }
  }
}

export { scrollToDate };

// import { getDateIndex } from '../app/appFunctions';

function scrollToDate() {
  const timeframeDiv = document.getElementsByClassName('timeframeDiv');

  if(this.dateSelected.length == 0) {
    for(let i = 0; i < timeframeDiv.length; i++) {
      timeframeDiv[i].scrollTo(0, 0);
    }
  } else {
    let timeframeHeader = document.getElementsByClassName('timeframeHeader'),
        timeframe,
        dates;

    for(let i = 0; i < timeframeDiv.length; i++) {
      timeframe = timeframeHeader[i].innerHTML.toLowerCase();
      console.log(timeframe);
      dates = timeframeDiv[i].querySelectorAll('.dateHeader');
      for(let i = 0; i < dates.length; i++) {
        console.log(dates[i]);
      }
    }


    // let timeframeObj;
    // // let date = new Date(this.dateSelected),
    // //     timeframeObj,
    // //     index,
    // //     node,
    // //     len;
    //
    // for(let i = 0; i < this.timeframes.length; i++) {
    //   timeframeObj = this.timeframes[i];
    //   console.log(timeframeObj);
    //   /*
    //   len = timeframeObj['dates'].length;
    //   if(len > 0) {
    //     index = getDateIndex(timeframeObj['timeframe'], timeframeObj['dates'][0].date, date);
    //     if(index < 0) {
    //       //Scroll to top
    //       tasksDiv[i].scrollTo(0, 0);
    //     } else if(index >= len) {
    //       //Scroll to bottom
    //       node = tasksDiv[i].querySelectorAll('.tasksDateDiv')[len - 1];
    //       tasksDiv[i].scrollTo(0, node.offsetTop - 76);
    //     } else {
    //       //Scroll to node
    //       node = tasksDiv[i].querySelectorAll('.tasksDateDiv')[index];
    //       tasksDiv[i].scrollTo(0, node.offsetTop - 76);
    //     }
    //     */
    // }
  }
}

export { scrollToDate };

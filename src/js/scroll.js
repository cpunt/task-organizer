import { addZero } from './sharedFunctions.js';

function scrollToDate() {
  const tasksDiv = document.getElementsByClassName('tasksDiv');

  if(this.dateSelected.length == 0) {
    for(let i = 0; i < tasksDiv.length; i++) {
      tasksDiv[i].scrollTo(0, 0);
    }
  } else {
    const selectedDate = new Date(this.dateSelected);
    scrollYearly(selectedDate, tasksDiv[0]);
    scrollMonthly(selectedDate, tasksDiv[1]);
    scrollWeekly(selectedDate, tasksDiv[2]);
    scrollDaily(selectedDate, tasksDiv[3]);
  }
}

function scrollYearly(date, div) {
  const yearly = document.getElementsByClassName('yearly');
  let year = date.getFullYear();

  for(let i = 0; i < yearly.length; i++) {
    if(yearly[i].innerHTML == year) {
      //76 is size of top two elements
      div.scrollTo(0, yearly[i].parentNode.offsetTop - 76);
    }
  }
}

function scrollMonthly(date, div) {
  const monthly = document.getElementsByClassName('monthly');
  let year = date.getFullYear(),
      month = addZero(date.getMonth() + 1);

  for(let i = 0; i < monthly.length; i++) {
    if(monthly[i].innerHTML == `${month}/${year}`) {
      div.scrollTo(0, monthly[i].parentNode.offsetTop - 76);
    }
  }


}

function scrollWeekly(date, div) {
  const weekly = document.getElementsByClassName('weekly');

  if(date.getDay() == 0) {
    date.setDate(date.getDate() - 6) ;
  } else if(date.getDay() > 1){
    date.setDate((date.getDate() - date.getDay()) + 1) ;
  }

  let year = date.getFullYear(),
      month = addZero(date.getMonth() + 1),
      day = addZero(date.getDate()),
      week;

  for(let i = 0; i < weekly.length; i++) {
    week = weekly[i].innerHTML.split('-')[0].trim();

    if(week == `${day}/${month}/${year}`) {
      div.scrollTo(0, weekly[i].parentNode.offsetTop - 76);
    }
  }
}

function scrollDaily(date, div) {
  const daily = document.getElementsByClassName('daily');
  let year = date.getFullYear(),
      month = addZero(date.getMonth() + 1),
      day = addZero(date.getDate());

  for(let i = 0; i < daily.length; i++) {
    if(daily[i].innerHTML == `${day}/${month}/${year}`) {
      div.scrollTo(0, daily[i].parentNode.offsetTop - 76);
    }
  }
}

export { scrollToDate };

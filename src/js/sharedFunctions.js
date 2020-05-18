function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function currentDate() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if(month < 10) {
    month = `0${month}`;
  }

  if(day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
}

function addZero(num) {
  if(num < 10) {
    num = `0${num}`;
  }

  return num;
}

export { capitalizeFirstLetter, currentDate, addZero };

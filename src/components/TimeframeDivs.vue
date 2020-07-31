<template>
<div :id='timeframe' class='timeframeDiv' :ref='timeframe'>

  <div class='headerDiv sticky-top text-center'>
    <h3 class='font-weight-normal timeframeHeader'>{{ timeframeHeader }}</h3>
  </div>

  <div v-for='(n, i) in datesRange[timeframe].stop' :key='i' class='tasksDiv text-left'>
    <div v-if='dates[i + datesRange[timeframe].start].tasks.length === 0 && dates[i + datesRange[timeframe].start - 1].tasks.length > 0'>
      <h5 class='dateHeader text-center mb-0 font-weight-normal' :class='timeframe'>{{ getEmptyDates(i + datesRange[timeframe].start) }}</h5>
    </div>

    <div v-else-if='dates[i + datesRange[timeframe].start].tasks.length > 0'>
      <h5 class='dateHeader text-center mb-0 font-weight-normal' :class='timeframe'>{{ taskDate(dates[i + datesRange[timeframe].start].date) }}</h5>

      <div v-for='(task, taskIndex) in dates[i + datesRange[timeframe].start].tasks' :key='taskIndex'>
        <TasksDate v-if='displayTask(task)'
                   class='list-group my-2'
                   :tasksids='[task]'
                   :date='dates[i + datesRange[timeframe].start].date'
                   :timeframe='timeframe'
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TasksDate from './TasksDate.vue';
import { taskDate, displayTask } from '../js/timeframe/timeframeMethods.js';
import { timeframeHeader } from '../js/timeframe/timeframeComputed.js';
import { mapState } from 'vuex'

export default {
  name: 'TimeframeDivs',
  props: {
    timeframetasks: {
      type: Array,
      required: true
    },
    timeframe: {
      type: String,
      required: true
    }
  },
  watch: {
    dateSelected() {
      // ToDo make scrollToDate work
      // this.scrollToDate();
    },
    timeframetasks(val) {
      this.$store.commit('dates/UNSET_TIMEFRAME_DATES', this.timeframe);
      this.$store.dispatch('dates/setTimeframeDates', {
        taskIds: val,
        tasks: this.tasks,
        timeframe: this.timeframe,
        dateSelected: this.dateSelected
       });
    }
  },
  methods: {
    taskDate,
    displayTask,
    /*
    scrollToDate() {
      if(this.dates.length > 0 && this.dateSelected.length > 0) {
        const timeframe = this.timeframeobj.timeframe;
        const dateIndex = getDateIndex(timeframe, this.dates[0].date, new Date(this.dateSelected));
        const timeframeDiv = this.$refs[timeframe];
        const taskDivs = timeframeDiv.querySelectorAll('.tasksDiv');

        if(dateIndex <= 0) {
          //Go to start
          timeframeDiv.scrollTo(0, 0);
        } else if(dateIndex >= this.dates.length) {
          //Go to end
          timeframeDiv.scrollTo(0, taskDivs[taskDivs.length - 1].offsetTop - 41);
        } else {
          //Go to date
          timeframeDiv.scrollTo(0, taskDivs[dateIndex].offsetTop - 41);
        }
      }
    },
    */
    getEmptyDates(dateIndex) {
      if(dateIndex === 0 || this.dates[dateIndex-1].tasks.length > 0) {
        let date;
        if(this.dates[dateIndex+1].tasks.length > 0) {
          date = this.taskDate(this.dates[dateIndex].date);
        } else {
          let nextDate;
          date = `${this.taskDate(this.dates[dateIndex].date)} ... `;

          for(let i = dateIndex + 1; i < this.dates.length; i++) {
            nextDate = this.dates[i + 1];

            if(nextDate === undefined || nextDate.tasks.length > 0) {
              date += this.taskDate(this.dates[i].date);
              break;
            }
          }
        }

        return date;
      }
    },

  },
  computed: {
    timeframeHeader,
    ...mapState('sidebar', [
      'dateSelected',
      'taskSelected'
    ]),
    ...mapState('tasks', [
      'tasks'
    ]),
    ...mapState('dates', [
      'datesRange'
    ]),
    dates() {
      return this.$store.getters['dates/getTimeframeDates'](this.timeframe);
    }
  },
  components: {
    TasksDate
  },
  mounted: function() {
    const timeframeDiv = document.getElementById(this.timeframe);
    // Function will need to be moved to methods.
    timeframeDiv.addEventListener("scroll", () => {
      if (this.dates.length < 25) {
        // Remove event listener
        return;
      }
      const tasksDiv = timeframeDiv.getElementsByClassName('tasksDiv');
      const bottom = timeframeDiv.scrollHeight - timeframeDiv.offsetHeight;
      const scrollPosition = timeframeDiv.scrollTop;
      let start = this.datesRange[this.timeframe].start;
      let stop = this.datesRange[this.timeframe].stop;

      // Have to add scroll for going up aswell

      if (scrollPosition === bottom) {
        console.log('Load down');
        tasksDiv[15].scrollIntoView(false);

        if (start + 10 > this.dates.length) {
          if (start !== this.dates.length - 25) {
            this.$store.commit('dates/SET_TIMEFRAME_DATES_RANGE', {
              timeframe: this.timeframe,
              start: this.dates.length - 25,
              stop: stop
            }, { root: true });
          }
        } else {
          this.$store.commit('dates/SET_TIMEFRAME_DATES_RANGE', {
            timeframe: this.timeframe,
            start: start + 10,
            stop: stop
          }, { root: true });
        }
      } else if (scrollPosition === 0) {
        if (start - 10 < 0) {
          if (start !== 0) {
            tasksDiv[10].scrollIntoView(true);

            this.$store.commit('dates/SET_TIMEFRAME_DATES_RANGE', {
              timeframe: this.timeframe,
              start: 0,
              stop: stop
            }, { root: true });
          }
        } else {
          tasksDiv[10].scrollIntoView(true);

          this.$store.commit('dates/SET_TIMEFRAME_DATES_RANGE', {
            timeframe: this.timeframe,
            start: start - 10,
            stop: stop
          }, { root: true });
        }
      }
    });
  }
}
</script>

<style>
.timeframeDiv {
  display: inline-block;
  vertical-align: top;
  width: 25%;
  height: 100%;
  border-right: 1px solid black;
  overflow: scroll;
}

/* .bottom {
  margin-bottom: 90vh;
} */

.dateHeader {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  margin-top: -1px;
}

.headerDiv {
  border-bottom: 1px solid black;
  z-index: 1;
}

.headerDiv, .dateHeader {
  background-color: #90a4ae;
  color: white;
}
</style>


<!-- getDates() {
  console.log('I reset the dates');
  const taskIds = this.timeframetasks;

  if(taskIds.length == 0) {
    return [];
  }
  //Add dates
  let minDate = new Date(Math.min.apply(null, taskIds.map(taskId => new Date(this.tasks[taskId].time.startDate))));
  let maxDate = new Date(Math.max.apply(null, taskIds.map(taskId => new Date(this.tasks[taskId].time.endDate))));
  let datesArr = [];
  const taskDates = getTaskDates(this.timeframe, minDate, maxDate);

  taskDates.forEach(date => datesArr.push({
    date: date,
    tasks: []
  }));

  //Add tasks
  let task, startDateIndex, endDateIndex;

  taskIds.forEach(taskId => {
    task = this.tasks[taskId];
    startDateIndex = getDateIndex(this.timeframe, datesArr[0].date, new Date(task.time.startDate));
    endDateIndex = getDateIndex(this.timeframe, datesArr[0].date, new Date(task.time.endDate));

    for(let j = startDateIndex; j <= endDateIndex; j++) {
      if(datesArr[j]) {
        datesArr[j].tasks.push(taskId);
      }
    }
  });

  return datesArr;
} -->

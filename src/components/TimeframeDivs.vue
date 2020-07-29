<template>
<div class='timeframeDiv' :ref='timeframe'>

  <div class='headerDiv sticky-top text-center'>
    <h3 class='font-weight-normal timeframeHeader'>{{ timeframeHeader }}</h3>
  </div>

  <div v-for='(datesObj, datesIndex) in dates' :key='datesIndex' class='tasksDiv text-left' :class='{ bottom: datesIndex == (dates.length - 1) }'>
    <div v-if='datesObj.tasks.length === 0 && dates[datesIndex - 1].tasks.length > 0'>
      <h5 class='dateHeader text-center mb-0 font-weight-normal' :class='timeframe'>{{ getEmptyDates(datesIndex) }}</h5>
    </div>

    <div v-else-if='datesObj.tasks.length > 0'>
      <h5 class='dateHeader text-center mb-0 font-weight-normal' :class='timeframe'>{{ taskDate(datesObj.date) }}</h5>

      <div v-for='(task, taskIndex) in datesObj.tasks' :key='taskIndex'>
        <TasksDate v-if='displayTask(task)'
                   class='list-group my-2'
                   :tasksids='[task]'
                   :date='datesObj.date'
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
import { getDateIndex, getTaskDates } from '../js/app/appFunctions.js';
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
  data() {
    return {
      dates: []
    }
  },
  watch: {
    dateSelected() {
      this.scrollToDate();
    },
    timeframetasks() {
      this.dates = this.getDates();
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
    getDates() {
      let datesArr = [];
      const tasks = this.timeframetasks;
      console.log('I reset the dates');
      if(tasks.length == 0) {
        return datesArr;
      }

      //Add dates
      let startDate = new Date(this.tasks[tasks[0]].time.startDate),
          endDate = new Date(this.tasks[tasks[0]].time.endDate),
          startDateTemp,
          endDateTemp;

      for(let i = 1; i < tasks.length; i++) {
        startDateTemp = new Date(this.tasks[tasks[i]].time.startDate);
        endDateTemp = new Date(this.tasks[tasks[i]].time.endDate);

        if(startDateTemp < startDate) {
          startDate = startDateTemp;
        }

        if(endDateTemp > endDate) {
          endDate = endDateTemp;
        }
      }

      const taskDates = getTaskDates(this.timeframe, startDate, endDate);
      let dateMap = {};

      for(let i = 0; i < taskDates.length; i++) {
        dateMap['date'] = taskDates[i];
        dateMap['tasks'] = [];
        datesArr.push(dateMap);
        dateMap = {};
      }
      //Add tasks
      let task,
          startDateIndex,
          endDateIndex;

      for(let i = 0; i < tasks.length; i++) {
        task = this.tasks[tasks[i]];
        startDateIndex = getDateIndex(this.timeframe, datesArr[0].date, new Date(task.time.startDate));
        endDateIndex = getDateIndex(this.timeframe, datesArr[0].date, new Date(task.time.endDate));

        for(let j = startDateIndex; j <= endDateIndex; j++) {
          if(datesArr[j]) {
            datesArr[j].tasks.push(tasks[i]);
          }
        }
      }

      return datesArr;
    }
  },
  computed: {
    timeframeHeader,
    ...mapState('sidebar', [
      'dateSelected',
      'taskSelected'
    ]),
    ...mapState('tasks', [
      'tasks'
    ])
  },
  components: {
    TasksDate
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

.bottom {
  margin-bottom: 90vh;
}

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

<template>
<div class='timeframeDiv' :ref='timeframeobj.timeframe'>

  <div class='headerDiv sticky-top text-center'>
    <h3 class='font-weight-normal timeframeHeader'>{{ timeframeHeader }}</h3>
  </div>

  <div v-for='(datesObj, datesIndex) in dates' :key='datesIndex' class='tasksDiv text-left' :class='{ bottom: datesIndex == (dates.length - 1) }'>
    <h5 class='dateHeader text-center mb-0 font-weight-normal' :class='timeframeobj.timeframe'>{{ taskDate(datesObj.date) }}</h5>

    <div v-for='(task, taskIndex) in datesObj.tasks' :key='taskIndex'>
      <TasksDate v-if='displayTask(task)'
                 class='list-group my-2'
                 :tasksids='[task]'
                 :date='datesObj.date'
                 :timeframe='timeframeobj.timeframe'
      >
      </TasksDate>
    </div>
  </div>

</div>
</template>

<script>
import TasksDate from './TasksDate.vue';
import { taskDate, displayTask } from '../js/timeframe/timeframeMethods.js';
import { dates, timeframeHeader } from '../js/timeframe/timeframeComputed.js';
import { getDateIndex } from '../js/app/appFunctions.js';
import { mapState } from 'vuex'

export default {
  name: 'TimeframeDivs',
  props: {
    timeframeobj: {
      type: Object,
      required: true
    }
  },
  watch: {
    dateSelected() {
      this.scrollToDate();
    }
  },
  methods: {
    taskDate,
    displayTask,
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
    }
  },
  computed: {
    timeframeHeader,
    dates,
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

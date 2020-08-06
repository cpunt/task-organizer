<template>
<div :id='timeframe' class='timeframeDiv' :ref='timeframe'>

  <div class='headerDiv sticky-top text-center'>
    <h3 class='font-weight-normal timeframeHeader'>{{ timeframeHeader }}</h3>
  </div>

  <div class='allTasksDiv'>
    <div v-for='(datesObj, i) in displayDates' :key='i' class='tasksDiv text-left'>
      <div v-if='datesObj.tasks.length === 0'>
        <h5 v-if='displayDates[i-1].tasks.length > 0 && displayDates[i+1].tasks.length > 0' class='dateHeader text-center mb-0 font-weight-normal' :class='timeframe'>{{ taskDate(datesObj.date) }}</h5>
        <h5 v-else-if='displayDates[i-1].tasks.length > 0' class='dateHeader text-center mb-0 font-weight-normal' :class='timeframe'>{{ taskDate(datesObj.date) }}...</h5>
        <h5 v-else class='dateHeader text-center mb-0 font-weight-normal' :class='timeframe'>...{{ taskDate(datesObj.date) }}</h5>
      </div>

      <div v-else>
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
</div>
</template>

<script>
import TasksDate from './TasksDate.vue';
import { convertDateHeaderToDate } from '../js/timeframe/timeframeFunctions.js';
import { taskDate, displayTask } from '../js/timeframe/timeframeMethods.js';
import { timeframeHeader } from '../js/timeframe/timeframeComputed.js';
import { setDateToTimeframe } from '../js/sharedFunctions.js';
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
      return this.$store.state.dates.dates[this.timeframe];
    },
    displayDates () {
      const start = this.datesRange[this.timeframe].start;
      const end = this.datesRange[this.timeframe].end;
      const datesArr = [];

      if (this.dates.length === 0) {
        return datesArr;
      }

      for (let i = start; i <= end; i++) {
        if (this.dates[i].tasks.length === 0) {
          if (this.dates[i - 1].tasks.length > 0 || this.dates[i + 1].tasks.length > 0) {
            datesArr.push(this.dates[i]);
          }
          continue;
        }

        datesArr.push(this.dates[i]);
      }

      return datesArr
    }
  },
  watch: {
    displayDates () {
      const timeframeDiv = this.$refs[this.timeframe];
      timeframeDiv.addEventListener('scroll', this.loadTasks);
    },
    dateSelected (val) {
      this.$nextTick(() => this.scrollToDate(val));
    }
  },
  methods: {
    taskDate,
    displayTask,
    scrollToDate (newDate) {
      const scrollTo = setDateToTimeframe(this.timeframe, new Date(newDate)),
            timeframeDiv = this.$refs[this.timeframe],
            dateHeader = timeframeDiv.querySelectorAll('.dateHeader');

      if (dateHeader.length === 0) {
        return;
      }

      const startDate = convertDateHeaderToDate(this.timeframe, dateHeader[0].innerHTML),
            endDate = convertDateHeaderToDate(this.timeframe, dateHeader[dateHeader.length - 1].innerHTML);
      let date;

      // Scroll to top
      if (startDate >= scrollTo) {
        timeframeDiv.scrollTop = 0
        return;
      }

      // Scroll to bottom
      if (endDate <= scrollTo) {
        timeframeDiv.scrollTop = timeframeDiv.scrollHeight - timeframeDiv.offsetHeight;
        return;
      }

      // Scroll to date
      for (let i = 0; i < dateHeader.length; i++) {
        date = convertDateHeaderToDate(this.timeframe, dateHeader[i].innerHTML);

        if (scrollTo < date) {
          timeframeDiv.scroll(0, dateHeader[i-1].offsetTop - 41);
          break;
        }
      }
    },
    loadTasks () {
      const timeframeDiv = this.$refs[this.timeframe],
        tasksDiv = timeframeDiv.querySelectorAll('.tasksDiv'),
        bottom = timeframeDiv.scrollHeight - timeframeDiv.offsetHeight,
        scrollPosition = timeframeDiv.scrollTop;

      let start = this.datesRange[this.timeframe].start,
          end = this.datesRange[this.timeframe].end;

      if (scrollPosition === bottom) {
        console.log('Bottom');
        const datesLen = this.dates.length;

        if (end !== datesLen - 1) {
          tasksDiv[10].scrollIntoView(false);
          this.setDatesRange(this.timeframe, end);
        }
      } else if (scrollPosition === 0) {
        console.log('top');

        if (start !== 0) {
          timeframeDiv.scroll(0, tasksDiv[10].offsetTop - 41);
          this.setDatesRange(this.timeframe, start);
        }
      }
    },
    setDatesRange(timeframe, index) {
      this.$store.dispatch('dates/setDatesRange', {
        timeframe: timeframe,
        index: index
      }, { root: true });
    }
  },
  components: {
    TasksDate
  },
  mounted: function () {
    const timeframeDiv = this.$refs[this.timeframe];
    const allTasksDiv = timeframeDiv.querySelectorAll('.allTasksDiv')[0];

    const config = { childList: true, subtree: true };
    const callback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.removedNodes.length > 0) {
          this.scrollToDate(this.dateSelected);
          observer.disconnect();
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(allTasksDiv, config);
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

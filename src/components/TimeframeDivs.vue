<template>
<div :id='timeframe' class='timeframeDiv' :ref='timeframe'>

  <div class='headerDiv sticky-top text-center'>
    <h3 class='font-weight-normal timeframeHeader'>{{ timeframeHeader }}</h3>
  </div>

  <div v-for='(datesObj, i) in displayDates' :key='i' class='tasksDiv text-left'>
    <div v-if='datesObj.tasks.length === 0'>
      <h5 v-if='dates[i-1].tasks.length > 0 && dates[i+1].tasks.length > 0' class='dateHeader text-center mb-0 font-weight-normal' :class='timeframe'>{{ taskDate(datesObj.date) }}</h5>
      <h5 v-else-if='dates[i-1].tasks.length > 0' class='dateHeader text-center mb-0 font-weight-normal' :class='timeframe'>{{ taskDate(datesObj.date) }}...</h5>
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
    },
    displayDates() {
      if (this.dates.length === 0) {
        return [];
      }

      if (!this.datesRange[this.timeframe].scroll) {
        const timeframeDiv = document.getElementById(this.timeframe);
        timeframeDiv.removeEventListener('scroll', this.loadTasks);
      }

      const datesArr = [],
            range = this.datesRange[this.timeframe].range,
            index = this.datesRange[this.timeframe].index;

      let counter = 0;

      for (let i = index; i < this.dates.length; i++) {
        if (counter === range) {
          break;
        }

        if (this.dates[i].tasks.length === 0) {
          if (this.dates[i - 1].tasks.length > 0 || this.dates[i + 1].tasks.length > 0) {
            datesArr.push(this.dates[i]);
          }
          continue;
        }

        counter++
        datesArr.push(this.dates[i]);
      }

      return datesArr;
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
    loadTasks() {
      const timeframeDiv = document.getElementById(this.timeframe),
            tasksDiv = timeframeDiv.getElementsByClassName('tasksDiv'),
            bottom = timeframeDiv.scrollHeight - timeframeDiv.offsetHeight,
            scrollPosition = timeframeDiv.scrollTop;

      let index = this.datesRange[this.timeframe].index,
          max = this.datesRange[this.timeframe].max,
          n = this.datesRange[this.timeframe].n,
          newIndex;

      if (scrollPosition === bottom) {
        newIndex = index + n > max ? max : index + n;

        if (index !== max) {
          tasksDiv[15].scrollIntoView(false);

          this.setIndex(newIndex);
        }
      } else if (scrollPosition === 0) {
        newIndex = index - n < 0 ? 0 : index - n;

        if (index !== 0) {
          tasksDiv[10].scrollIntoView(true);

          this.setIndex(newIndex);
        }
      }
    },
    setIndex(newIndex) {
      this.$store.commit('dates/SET_DATES_RANGE_INDEX', {
        timeframe: this.timeframe,
        index: newIndex
      }, { root: true });
    }
  },
  components: {
    TasksDate
  },
  mounted: function() {
    document.getElementById(this.timeframe).addEventListener('scroll', this.loadTasks);
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

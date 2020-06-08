<template>
<div class='timeframeDiv'>

  <div class='sticky-top text-center headerDiv'>
    <h3>{{ timeframeHeader }}</h3>
  </div>

  <div class='tasksDiv'>

    <div v-for='(datesObj, objIndex) in dates' :key='objIndex' class='text-left tasksDateDiv' :class='{ bottom: objIndex == (dates.length - 1) }'>
      <h5 class='text-center dateHeader mb-0' :class='timeframe'>{{ taskDate(datesObj.date) }}</h5>

      <div class='mt-1 mb-1' v-for='(task, taskIndex) in datesObj.tasks' :key='taskIndex'>
        <TasksDate v-if='displayTask(task)' class='list-group' :tasks='[task]' :date='datesObj.date' :timeframe='timeframe' v-on='$listeners'></TasksDate>
      </div>

    </div>

  </div>

</div>
</template>

<script>
import TasksDate from './TasksDate.vue';
import { taskDate, displayTask } from '../js/timeframe/timeframeMethods.js';
import { timeframeHeader } from '../js/timeframe/timeframeComputed.js';

export default {
  name: 'TimeframeDivs',
  props: {
    dates: {
      type: Array,
      required: true
    },
    timeframe: {
      type: String,
      required: true
    },
    taskselected: {
      type: String,
      required: true
    }
  },
  methods: {
    taskDate,
    displayTask
  },
  computed: {
    timeframeHeader
  },
  components: {
    TasksDate
  }
}
</script>

<style>
.bottom {
  margin-bottom: 75vh;
}

.dateHeader {
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  margin-top: -2px;
}

.timeframeDiv {
  display: inline-block;
  vertical-align: top;
  width: 25%;
  height: 100%;
  border-right: 2px solid #333;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  overflow: scroll;
}

.headerDiv {
  border-bottom: 2px solid #333;
  background-color: white;
  z-index: 1;
}
</style>

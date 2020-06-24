<template>
<div class='timeframeDiv'>

  <div class='headerDiv sticky-top text-center'>
    <h3 class='font-weight-normal'>{{ timeframeHeader }}</h3>
  </div>

  <div>
    <div v-for='(datesObj, objIndex) in dates' :key='objIndex' class='text-left' :class='{ bottom: objIndex == (dates.length - 1) }'>
      <h5 class='dateHeader text-center mb-0 font-weight-normal' :class='timeframeobj.timeframe'>{{ taskDate(datesObj.date) }}</h5>

      <div class='mt-1 mb-1' v-for='(task, taskIndex) in datesObj.tasks' :key='taskIndex'>
        <TasksDate v-if='displayTask(task)' class='list-group' :tasks='[task]' :date='datesObj.date' :timeframe='timeframeobj.timeframe' v-on='$listeners'></TasksDate>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import TasksDate from './TasksDate.vue';

import { taskDate, displayTask } from '../js/timeframe/timeframeMethods.js';
import { dates, timeframeHeader } from '../js/timeframe/timeframeComputed.js';

export default {
  name: 'TimeframeDivs',
  props: {
    timeframeobj: {
      type: Object,
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
    timeframeHeader,
    dates
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
  /* border-top: 2px solid black; */
}

.bottom {
  margin-bottom: 75vh;
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

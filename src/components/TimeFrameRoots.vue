<template>
  <div class='tasksDiv'>
    <div v-for='(datesObj, objIndex) in dates' :key='objIndex' class='text-left tasksDateDiv' :class='{ bottom: objIndex == (dates.length - 1) }'>
      <h5 class='text-center dateHeader mb-0' :class='timeframe'>{{ taskDate(datesObj.date, timeframe) }}</h5>
      <div class='mt-1 mb-1' v-for='(task, taskIndex) in datesObj.tasks' :key='taskIndex'>
        <TimeframeNodes v-if='displayTask(task)' class='list-group' :tasks='[task]' :date='datesObj.date' :timeframe='timeframe'></TimeframeNodes>
      </div>
    </div>
  </div>
</template>

<script>
import TimeframeNodes from '../components/TimeframeNodes.vue';
import { taskDate } from '../js/timeframeFunctions.js';

export default {
  name: 'TimeframeRoots',
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
    displayTask(task) {
      if(this.taskselected.length == 0) {
        return true;
      }

      while(task.parent != null) {
        task = task.parent;
      }

      return this.taskselected == task.task;
    }
  },
  components: {
    TimeframeNodes
  }
}
</script>

<style>
.bottom {
  margin-bottom: 75vh;
}

.dateHeader {
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  margin-top: -2px;
}

.tasksDiv {
  display: inline-block;
  vertical-align: top;
  width: 25%;
  height: 100%;
  border-right: 1px solid #333;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  overflow: scroll;
}
</style>

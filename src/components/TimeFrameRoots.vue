<template>
  <div>
    <h3 class='header'>{{ timeframe }}</h3>
    <h5 class='header'>{{ taskDate(date, timeframe) }}</h5>

    <div v-for='(task, index) in tasks' :key='index' class='text-left'>
      <h5 class='text-center'>{{ taskDate(task.time.fromDate, timeframe) }}</h5>
      <ul class='list-group'>
        <li>
          <div class='rounded bg-info text-light liDiv'>
            <p class='mb-0'>{{ task.task }}</p>
            <p class='mb-0'>{{ task.time.fromDate }}</p>
            <p class='mb-0'>{{ task.time.toDate }}</p>
            <div class='text-right'>
              <span v-if='displayTaskList(task)' class='caret' :class="{ 'caret-down': showChildren[index] }" @click='toggleChildren(index)'></span>
            </div>
          </div>
          <TimeFrameNodes v-if='displayTaskList(task) && showChildren[index]' :tasks='task.children'></TimeFrameNodes>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import TimeFrameNodes from '../components/TimeFrameNodes.vue';
import { taskDate, displayTaskList,  toggleChildren, orderTasksByDate, createShowChildrenArray } from '../js/timeFrameFunctions.js';

export default {
  name: 'TimeFrameRoots',
  props: {
    tasks: {
      type: Array,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    timeframe: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      showChildren: []
    }
  },
  methods: {
    taskDate,
    displayTaskList,
    toggleChildren,
    orderTasksByDate,
    createShowChildrenArray

    // compareDates(time) {
    //   const taskFromDate = new Date(time.fromDate);
    //   const taskToDate = new Date(time.toDate);
    //   // const searchDate =
    //
    // }
  },
  components: {
    TimeFrameNodes
  },
  mounted: function() {
    this.orderTasksByDate();
    this.createShowChildrenArray();
  }
}
</script>

<style>
ul  {
   list-style:none;
   padding-inline-start: 5px;
}

.header{
  border-bottom: 1px dashed #333;
}

.liDiv {
  width: 200px;
  margin-left: 5px;
  margin-bottom: 3px;
}

.caret {
  cursor: pointer;
  user-select: none;
}

.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.caret-down::before {
  transform: rotate(90deg);
}
</style>

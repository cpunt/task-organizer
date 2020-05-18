<template>
  <ul>
    <li v-for='(task, index) in validTasks' :key='index'>
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
</template>

<script>
import { taskDate, displayTaskList,  toggleChildren, orderTasksByDate, createShowChildrenArray } from '../js/timeFrameFunctions.js';

export default {
  name: 'TimeFrameNodes',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
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
  },
  computed: {
    validTasks() {
      return this.tasks.filter(task => task.time.timeFrame == task.parent.time.timeFrame);
    }
  },
  mounted: function() {
    this.orderTasksByDate();
    this.createShowChildrenArray();
  }
}
</script>

<style>

</style>

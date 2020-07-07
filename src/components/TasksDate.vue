<template>
<ul>
  <li v-for='(taskId, index) in validTasks' :key='index'>
    <Task :taskid='taskId'
          :date='date'
          :timeframe='timeframe'
          :tasks='tasks'
          v-on='$listeners'>
    </Task>
  </li>
</ul>
</template>

<script>
import { validTasks } from '../js/timeframe/timeframeComputed.js';

export default {
  name: 'TasksDate',
  props: {
    tasksids: {
      type: Array,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    timeframe: {
      type: String,
      required: true
    },
    tasks: {
      type: Object,
      required: true
    }
  },
  computed: {
    validTasks
  },
  components: {
    Task: () => import('./Task.vue')
  }
}
</script>

<style>
ul  {
   list-style:none;
   padding-inline-start: 10px;
}
</style>

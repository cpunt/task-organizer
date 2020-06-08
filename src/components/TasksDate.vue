<template>
<ul>
  <li v-for='(task, index) in validTasks' :key='index'>
    <Task :task='task' :date='date' :timeframe='timeframe' v-on='$listeners'></Task>
  </li>
</ul>
</template>

<script>
import { validTasks } from '../js/timeframe/timeframeComputed.js';

export default {
  name: 'TasksDate',
  props: {
    tasks: {
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

.caret {
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
}

.caret::before {
  content: '\25B6';
  color: white;
  display: inline-block;
  margin-right: 6px;
}

.caret::before {
  content: '\25B6';
  color: white;
  display: inline-block;
  margin-right: 6px;
}

.caret-down::before {
  transform: rotate(90deg);
}
</style>

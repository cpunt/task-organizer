<template>
<ul>
  <li v-for='(taskId, index) in validTasks' :key='index'>
    <Task :taskid='taskId'
          :task='tasks[taskId]'
          :date='date'
          :timeframe='timeframe'
    >
    </Task>
  </li>
</ul>
</template>

<script>
import { validTasks } from '../js/timeframe/timeframeComputed.js';
import { mapState } from 'vuex'

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
    }
  },
  computed: {
    validTasks,
    ...mapState('tasks', [
      'tasks'
    ])
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

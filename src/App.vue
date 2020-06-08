<template>
<div id='app'>
  <TaskBar class='taskBar mb-0' v-if='!newtask' @add-new-task='addNewTask' @update-task-selected='updateTaskSelected' :roots='roots' :timeframes='timeframes' :taskselected='taskselected'></TaskBar>

  <div v-if='!newtask' id='timeframesDiv' class='text-center'>
    <TimeframeDivs v-for='(timeframeObj, index) in timeframes'
                   :key='index'
                   :class='{ borderLeft: index == 0 }'
                   :dates='timeframeObj.dates'
                   :timeframe='timeframeObj.timeframe'
                   :taskselected='taskselected'
                   v-on='$listeners'
                   @view-task='updateTask'
    >
   </TimeframeDivs>

   <ViewTask v-if='task != null' :task='task' @close-task='updateTask'></ViewTask>
  </div>

  <CreateTask v-if='newtask' @create-new-task='createNewTask'  @cancel-new-task='cancelNewTask' :tasks='roots'></CreateTask>

</div>
</template>

<script>
import CreateTask from './components/CreateTask.vue';
import TimeframeDivs from './components/TimeframeDivs.vue';
import ViewTask from './components/ViewTask.vue';
import TaskBar from './components/TaskBar.vue';

import { updateTaskSelected, addNewTask, cancelNewTask, createNewTask, addTaskToTimeframe } from './js/app/appMethods.js';

export default {
  name: 'App',
  data: function() {
    return {
      taskselected: '',
      newtask: false,
      task: null,
      roots: [],
      timeframes: [
        {
          timeframe: 'yearly',
          dates: []
        },
        {
          timeframe: 'monthly',
          dates: []
        },
        {
          timeframe: 'weekly',
          dates: []
        },
        {
          timeframe: 'daily',
          dates: []
        }
      ]
    }
  },
  methods: {
    addNewTask,
    cancelNewTask,
    updateTaskSelected,
    createNewTask,
    addTaskToTimeframe,
    updateTask(task) {
      this.task = task;
    }
  },
  components: {
    CreateTask,
    TimeframeDivs,
    ViewTask,
    TaskBar
  }
}
</script>

<style>
input[type=date]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
}

.taskBar {
  margin-bottom: 10px;
}

.borderLeft {
  border-left: 1px solid #333;
}

#timeframesDiv {
  width: 100%;
  height: 93vh;
}
</style>

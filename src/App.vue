<template>
<div id='app'>
  <div v-if='bgScreen' class='backgroundScreen' @click='closeScreen'></div>

  <TaskBar v-if='false' class='taskBar mb-0' @add-task='addTask' @update-task-selected='updateTaskSelected' :roots='roots' :timeframes='timeframes' :taskselected='taskselected'></TaskBar>

  <div id='timeframesDiv' class='text-center'>
    <TimeframeDivs v-for='(timeframeObj, index) in timeframes'
                   :key='index'
                   :class='{ borderLeft: index == 0 }'
                   :timeframeobj='timeframeObj'
                   :taskselected='taskselected'
                   v-on='$listeners'
                   @view-task='viewTask'
                   @confirm-delete-task='confirmDeleteTask'
                   @add-task='addTask'
    >
    </TimeframeDivs>
  </div>

  <ViewTask v-if='vtask' @cancel='closeScreen' @add-task='addTask' @confirm-delete-task='confirmDeleteTask' :task='task'></ViewTask>
  <NewTask v-if='ntask' @cancel='closeScreen' @create-task='createTask' :tasks='roots' :parent='task'></NewTask>
  <DeleteTask v-if='dtask' @cancel='closeScreen' @delete-task='deleteTask' :task='task'></DeleteTask>

</div>
</template>

<script>
import TaskBar from './components/TaskBar.vue';
import TimeframeDivs from './components/TimeframeDivs.vue';
import ViewTask from './components/ViewTask.vue';
import NewTask from './components/NewTask.vue';
import DeleteTask from './components/DeleteTask.vue';

import { updateTaskSelected, createTask, viewTask, deleteTask } from './js/app/appMethods.js';
import { timeframes } from './js/app/appComputed.js';

export default {
  name: 'App',
  data: function() {
    return {
      roots: [],
      taskselected: '',
      task: null,
      vtask: false,
      ntask: false,
      dtask: false,
      bgScreen: false
    }
  },
  methods: {
    updateTaskSelected,
    createTask,
    viewTask,
    deleteTask,
    addTask(task) {
      this.bgScreen = true;

      if(this.vtask) {
        this.vtask = false;
      }

      this.ntask = true;
      this.task = task;
    },
    closeScreen() {
      this.bgScreen = false;

      if(this.task != null) {
        this.task = null;
      }

      //View task screen
      if(this.vtask) {
        this.vtask = false;
      }

      //Create / add task screen
      if(this.ntask) {
        this.ntask = false;
      }

      //Delete screen
      if(this.dtask) {
        this.dtask = false;
      }
    },
    confirmDeleteTask(task) {
      if(this.vtask) {
        this.vtask = false;
      }

      this.bgScreen = true;
      this.dtask = true;
      this.task = task;
    }
  },
  computed: {
    timeframes
  },
  components: {
    TaskBar,
    TimeframeDivs,
    ViewTask,
    NewTask,
    DeleteTask
  }
}
</script>

<style>
input[type=date]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
}

body {
  /* background-color: #f8f9fa; */

   /* background-color: #b8c6db;
   background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%); */

   /* background-color: #f3f4f7;
   background-image: linear-gradient(315deg, #f3f4f7 0%, #caccd1 74%); */
}

html {
  height: 100%;
  background-color: #f5f5f5;
}

.backgroundScreen {
  position:fixed;
  padding:0;
  margin:0;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background:rgba(255,255,255,0.5);
  z-index: 10;
}

.taskBar {
  margin-bottom: 10px;
}

.borderLeft {
  border-left: 1px solid #333;
}

#timeframesDiv {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>

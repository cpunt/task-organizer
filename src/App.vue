<template>
<div id='app'>
  <div v-if='bgScreen' class='backgroundScreen' @click='closeScreen'></div>

  <TaskBar class='taskBar mb-0' @add-task='addTask' @update-task-selected='updateTaskSelected' :roots='roots' :timeframes='timeframes' :taskselected='taskselected'></TaskBar>

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

  <ViewTask v-if='vtask != null' @cancel='closeScreen' @add-task='addTask' @confirm-delete-task='confirmDeleteTask' :task='vtask'></ViewTask>
  <NewTask v-if='newtask' @cancel='closeScreen' @create-task='createTask' :tasks='roots' :newtasknode='newtasknode'></NewTask>
  <DeleteTask v-if='dtask != null' @cancel='closeScreen' @delete-task='deleteTask' :task='dtask'></DeleteTask>

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
      newtasknode: null,
      newtask: false,
      vtask: null,
      dtask: null,
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

      if(this.vtask != null) {
        this.vtask = null;
      }

      this.newtasknode = task;
      this.newtask = true;
    },
    closeScreen() {
      this.bgScreen = false;

      //View task screen
      if(this.vtask != null) {
        this.vtask = null;
      }

      //Create / add task screen
      if(this.newtasknode != null) {
        this.newtasknode = null;
      }

      if(this.newtask) {
        this.newtask = false;
      }

      //Delete screen
      if(this.dtask != null) {
        this.dtask = null;
      }
    },
    confirmDeleteTask(task) {
      this.bgScreen = true;
      this.dtask = task;
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
  height: 93vh;
}
</style>

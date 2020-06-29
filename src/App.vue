<template>
<div id='app'>
  <div v-if='bgScreen' class='backgroundScreen' @click='closeScreen'></div>

  <SideBar class='sideBar'
           :class='{ sideBarOpen: sideBarActive, sideBarClosed: !sideBarActive }'
           :roots='roots'
           :timeframes='timeframes'
           :taskselected='taskselected'
           :sidebaractive='sideBarActive'
           @toggle-side-bar='toggleSideBar'
           @add-task='addTask'
           @update-task-selected='updateTaskSelected'
           @update-date-selected='updateDateSelected'
  >
  </SideBar>

  <div id='timeframesDiv' class='text-center' :class='{ tfDSidebar: sideBarActive, tfDNoSidebar: !sideBarActive}'>
    <TimeframeDivs v-for='(timeframeObj, index) in timeframes'
                   :key='index'
                   :timeframeobj='timeframeObj'
                   :taskselected='taskselected'
                   :dateselected='dateselected'
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
import SideBar from './components/SideBar.vue';
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
      dateselected: '',
      task: null,
      vtask: false,
      ntask: false,
      dtask: false,
      bgScreen: false,
      sideBarActive: false
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
    },
    updateDateSelected(date) {
      this.dateselected = date;
    },
    toggleSideBar() {
      this.sideBarActive = !this.sideBarActive;
    }
  },
  computed: {
    timeframes
  },
  components: {
    SideBar,
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
   /* background-color: #b8c6db;
   background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%); */

   /* background-color: #f3f4f7;
   background-image: linear-gradient(315deg, #f3f4f7 0%, #caccd1 74%); */

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

.sideBar {
  z-index: 2;
  border-right: 1px solid #333;
  background-color: #f5f5f5
}

.sideBarClosed {
  width: 3%;
}

.sideBarOpen {
  width: 20%;
}

.tfDSidebar {
  width: 80%;
  left: 20%;
}

.tfDNoSidebar {
  width: 97%;
  left: 3%;
}

#timeframesDiv, .sideBar {
  display: inline-block;
  position: absolute;
  height: 100%;
}
</style>

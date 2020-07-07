<template>
<div id='app'>
  <div v-if='bgScreen' class='backgroundScreen' @click='closeScreen'></div>

  <SideBar class='sideBar'
           :class='{ sideBarOpen: sideBarActive, sideBarClosed: !sideBarActive }'
           :roots='roots'
           :tasks='tasks'
           :taskselected='taskselected'
           :sidebaractive='sideBarActive'
           :user='user'
           @toggle-side-bar='toggleSideBar'
           @add-task='addTask'
           @update-date-selected='updateDateSelected'
  >
  </SideBar>

  <div id='timeframesDiv' class='text-center' :class='{ tfDSidebar: sideBarActive, tfDNoSidebar: !sideBarActive}'>
    <TimeframeDivs v-for='(timeframeObj, index) in timeframes'
                   :key='index'
                   :timeframeobj='timeframeObj'
                   :taskselected='taskselected'
                   :dateselected='dateselected'
                   :tasks='tasks'
                   v-on='$listeners'
                   @view-task='viewTask'
                   @confirm-delete-task='confirmDeleteTask'
                   @add-task='addTask'
    >
    </TimeframeDivs>
  </div>

  <ViewTask v-if='vtask'
            @cancel='closeScreen'
            @add-task='addTask'
            @confirm-delete-task='confirmDeleteTask'
            :taskid='taskid'
            :tasks='tasks'
  >
  </ViewTask>
  <NewTask v-if='ntask'
           @cancel='closeScreen'
           :taskid='taskid'
           :tasks='tasks'
  >
  </NewTask>
  <DeleteTask v-if='dtask'
              @cancel='closeScreen'
              :taskid='taskid'
              :tasks='tasks'>
  </DeleteTask>

</div>
</template>

<script>
import SideBar from './components/SideBar.vue';
import TimeframeDivs from './components/TimeframeDivs.vue';
import ViewTask from './components/ViewTask.vue';
import NewTask from './components/NewTask.vue';
import DeleteTask from './components/DeleteTask.vue';

import { viewTask } from './js/app/appMethods.js';
import { timeframes } from './js/app/appComputed.js';
import { getTasksDB, getSidebarDB } from './js/server/firestore.js';
import { userStatus } from './js/server/auth.js';


export default {
  name: 'App',
  data: function() {
    return {
      tasks: {},
      roots: [],
      taskid: '',
      taskselected: '',
      dateselected: '',
      vtask: false,
      ntask: false,
      dtask: false,
      bgScreen: false,
      sideBarActive: false,
      user: null
    }
  },
  methods: {
    viewTask,
    addTask(taskid) {
      this.bgScreen = true;
      this.vtask = false;
      this.ntask = true;
      this.taskid = taskid ? taskid : '';
    },
    closeScreen() {
      this.taskid = '';
      this.vtask = false;
      this.ntask = false;
      this.dtask = false;
      this.bgScreen = false;
    },
    confirmDeleteTask(taskid) {
      this.vtask = false;
      this.bgScreen = true;
      this.dtask = true;
      this.taskid = taskid;
    },
    updateDateSelected(date) {
      this.dateselected = date;
    },
    toggleSideBar() {
      this.sideBarActive = !this.sideBarActive;
    },
    getTasksDB,
    getSidebarDB,
    userStatus
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
  },
  mounted: function() {
    this.getTasksDB();
    this.getSidebarDB();
    this.userStatus();
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
  background-color: #f5f5f5;
}

.sideBarClosed {
  width: 3%;
  border-bottom: 1px solid #333;
  height: 42px;
  cursor: pointer;
}

.sideBarClosed:hover {
  background-color: #e3e3e3;
}

.sideBarOpen {
  width: 20%;
  height: 100%;
}

.tfDSidebar {
  width: 80%;
  left: 20%;
}

.tfDNoSidebar {
  width: 100%;
}

#timeframesDiv, .sideBar {
  display: inline-block;
  position: absolute;
}

#timeframesDiv {
  height: 100%;
}
</style>

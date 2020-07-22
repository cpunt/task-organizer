<template>
<div id='app'>

  <div v-if='bgScreen' class='backgroundScreen' @click='cancel'></div>

  <Sidebar class='sideBar' :class='{ sideBarOpen: sidebarActive, sideBarClosed: !sidebarActive }' />

  <div id='timeframesDiv' :class='{ tfDSidebar: sidebarActive, tfDNoSidebar: !sidebarActive}'>
    <TimeframeDivs v-for='(timeframeObj, index) in timeframes'
                   :key='index'
                   :timeframeobj='timeframeObj'
    />
  </div>

  <ViewTask v-if='vtask' />

  <NewTask v-if='ntask' />

  <DeleteTask v-if='dtask' />

</div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import TimeframeDivs from './components/TimeframeDivs.vue';
import ViewTask from './components/ViewTask.vue';
import NewTask from './components/NewTask.vue';
import DeleteTask from './components/DeleteTask.vue';

import { timeframes } from './js/app/appComputed.js';
import { store } from './store/store.js';
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  store,
  methods: {
    ...mapActions('display', [
      'cancel'
    ])
  },
  computed: {
    ...mapState([
      'user',
    ]),
    ...mapState('tasks', [
      'roots',
      'tasks'
    ]),
    ...mapState('sidebar', [
      'sidebarActive'
    ]),
    ...mapState('display', [
      'vtask',
      'ntask',
      'dtask',
      'bgScreen'
    ]),
    timeframes
  },
  components: {
    Sidebar,
    TimeframeDivs,
    ViewTask,
    NewTask,
    DeleteTask
  },
  mounted: function() {
    this.$store.dispatch('userStatus');
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

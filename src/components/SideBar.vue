<template>
<div class='text-center'>
  <div v-if='!sidebaractive'>
    <img  class='icon mt-1' src='../assets/right-arrow.svg' alt='Right Arrow' title='Open SideBar' @click='toggleSideBar'>
    <img  class='icon mt-5' src='../assets/add.svg' alt='Cross' title='Add Task' @click='addTask'>
    <!-- <img  class='icon mt-5' src='../assets/calendar.svg' alt='Calendar' title='From Date'> -->
    <!-- <img  class='icon mt-5' src='../assets/thumbtack.svg' alt='Thumbtack' title='Pin Task'> -->
  </div>

  <div v-else>
    <img class='icon float-right mr-3 mt-1' src='../assets/left-arrow.svg' alt='left-arrow' title='Close SideBar' @click='toggleSideBar'>

    <button class='btn btn-secondary mt-5 w-75' @click='addTask'>Add Task</button>

    <label class='mt-5 text-left w-100'>From Date:
      <input v-model='dateselected'
             class='form-control d-inline'
             type='date'
             @change='updateDate'
      >
    </label>

    <label class='mt-5 text-left w-100'>Select Task:
      <select class='form-control d-inline' v-model='taskroot' @change='updateSelected'>
        <option value=''></option>
        <option v-for='(root, index) in roots' :key='index' :value='root.task'>{{ root.task }}</option>
      </select>
    </label>

    <label class='mt-5 text-left w-100'>Task Status:
      <select class='form-control d-inline' v-model='taskstatus'>
        <option value=''></option>
        <option value='Active'>Active</option>
        <option value='Completed'>Completed</option>
        <option value='Incompleted'>Incompleted</option>
      </select>
    </label>

    <label class='mt-5 text-left w-100'>Children Displayed:
      <select class='form-control d-inline' v-model='childrendisplayed'>
        <option value='0'>0</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>
    </label>
  </div>
</div>
</template>


<script>
import { currentDate } from '../js/sharedFunctions.js';

export default {
  name: 'SideBar',
  props: {
    roots: {
      type: Array,
      required: true
    },
    timeframes: {
      type: Array,
      required: true
    },
    taskselected: {
      type: String,
      required: true
    },
    sidebaractive: {
      type: Boolean,
      required: true
    }
  },
  data: function() {
    return {
      dateselected: '',
      taskroot: this.taskselected,
      taskstatus: '',
      childrendisplayed: 0
    };
  },
  methods: {
    currentDate,
    addTask() {
      this.$emit('add-task', null);
    },
    toggleSideBar() {
      this.$emit('toggle-side-bar');
    },
    updateSelected() {
      this.$emit('update-task-selected', this.taskroot);
    },
    updateDate() {
      this.$emit('update-date-selected', this.dateselected);
    }
  },
  mounted: function() {
    this.dateselected = this.currentDate();
    this.updateDate();
  }
}
</script>


<style scoped>
  .icon {
    cursor: pointer;
    height: 26px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

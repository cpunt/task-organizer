<template>
<div>
  <div class='mb-1'>
    <label class='d-inline mx-3'>From:
      <input v-model='dateSelected'
             class='form-control d-inline w-25'
             type='date'
             @change='scrollToDate'
      >
    </label>


    <label class='d-inline mx-3'>Select Task:
      <select class='form-control d-inline w-25' v-model='taskroot' @change='updateSelected'>
        <option value=''></option>
        <option v-for='(root, index) in roots' :key='index' :value='root.task'>{{ root.task }}</option>
      </select>
    </label>

    <button class='btn btn-primary d-inline mx-4 align-top' @click='addTask'>Add Task</button>
  </div>
</div>
</template>


<script>
import { currentDate } from '../js/sharedFunctions.js';
import { scrollToDate } from '../js/scroll.js';

export default {
  name: 'TaskBar',
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
    }
  },
  data: function() {
    return {
      dateSelected: '',
      taskroot: this.taskselected
    };
  },
  methods: {
    currentDate,
    scrollToDate,
    updateSelected() {
      this.$emit('update-task-selected', this.taskroot);
    },
    addTask() {
      this.$emit('add-new-task');
    }
  },
  mounted: function() {
    this.dateSelected = this.currentDate();
  }
}
</script>


<style>


</style>

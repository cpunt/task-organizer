<template>
<div class='container my-1 card card-body shadow w-75'>
  <h3 class='text-center'>New Task</h3>
  <div class='taskInputDiv'>
    <label class='w-100 mb-0'>Task Parent:
      <select class='form-control mb-3' v-model='taskParent'>
        <option :value='null'></option>
        <option v-for='(taskObj, index) in taskPaths()' :value='taskObj.task' :key='index'>{{ taskObj.path.join('/') }}</option>
      </select>
    </label>
  </div>

  <div class='taskInputDiv'>
    <label class='w-100 mb-0'>Task:
      <input v-model='task' class='form-control' :class='{ invalidInput: errors.task }' type='text' maxlength='50'>
    </label>
    <p v-if='errors.task' class='invalidFeedback'>*Tasks length needs to be between 3-50 characters</p>
  </div>

  <div class='desDiv'>
    <label class='w-100 mb-0 text-left'>Description:
      <textarea v-model='description' class='desTextarea rounded w-100' :class='{ invalidInput: errors.description }' maxlength='500' placeholder='(optional)' >
      </textarea>
    </label>
    <p v-if='errors.description' class='invalidFeedback'>*Description needs to be between 0-500 characters</p>
  </div>

  <div class='taskInputDiv'>
    <label class='w-100 mb-0'>Timeframe:
      <select v-model='timeframe' class='form-control' :class='{ invalidInput: errors.timeframe }'>
        <option selected hidden disabled value=''></option>
        <option v-for='timeframeOption in timeframeOptions' :key='timeframeOption' :value='timeframeOption'>{{ capitalizeFirstLetter(timeframeOption) }}</option>
      </select>
    </label>
    <p v-if='errors.timeframe' class='invalidFeedback'>*Timeframe needs to be selected</p>
  </div>

  <div class='taskInputDiv'>
    <label class='w-100 mb-0'>Start Date:
      <input v-model='startDate'
             type='date'
             class='form-control'
             :class='{ invalidInput: errors.startDate }'
             :min='startDateMin'
             :max='startDateMax'
      >
    </label>
    <p v-if='errors.startDate' class='invalidFeedback'>*Start Date needs to be between {{ formatDate(startDateMin) }} - {{ formatDate(startDateMax) }}</p>
  </div>

  <div class='taskInputDiv'>
    <label class='w-100 mb-0'>End Date:
      <input v-model='endDate'
             type='date'
             class='form-control'
             :class='{ invalidInput: errors.endDate }'
             :min='endDateMin'
             :max='endDateMax'
      >
    </label>
    <p v-if='errors.endDate' class='invalidFeedback'>*End Date needs to be between {{ formatDate(endDateMin) }} - {{ formatDate(endDateMax) }}</p>
  </div>

  <div class='text-center'>
    <button class='btn btn-primary mx-1' @click='cancelTask'>Cancel</button>
    <button class='btn btn-primary mx-1' @click='createTask'>Create Task</button>
  </div>
</div>
</template>

<script>
import { taskPaths, cancelTask, createTask, validateTasks, setStartDate, updateTimeframe } from '../js/createTask/createTaskMethods.js';
import { startDateMin, startDateMax, endDateMin, endDateMax } from '../js/createTask/createTaskComputed.js';
import { taskParent, task, description, timeframe, startDate, endDate } from '../js/createTask/createTaskWatchers.js';
import { capitalizeFirstLetter, formatDate } from '../js/sharedFunctions.js';

export default {
  name: 'CreateTask',
  props: {
    tasks: {
      type: Array,
      required: true
    },
    newtasknode: {
      type: Object,
    }
  },
  data() {
    return {
      task: '',
      description: '',
      timeframe: '',
      startDate: '',
      endDate: '',
      taskParent: this.newtasknode,
      timeframeOptions: ['yearly', 'monthly', 'weekly', 'daily'],
      errors: {
        task: false,
        description: false,
        timeframe: false,
        startDate: false,
        endDate: false
      }
    }
  },
  watch: {
    taskParent,
    task,
    description,
    timeframe,
    startDate,
    endDate,
    startDateMin(val) {
      //Update start date
      this.startDate = val;
    }
  },
  methods: {
    capitalizeFirstLetter,
    formatDate,
    taskPaths,
    cancelTask,
    createTask,
    validateTasks,
    setStartDate,
    updateTimeframe
  },
  computed: {
    startDateMin,
    startDateMax,
    endDateMin,
    endDateMax
  },
  mounted() {
    window.scrollTo(0,0);
    this.setStartDate();
    this.updateTimeframe(this.newtasknode);
  }
}
</script>

<style scoped>
.taskInputDiv {
  height: 90px;
}

.invalidFeedback {
  color: #dc3545;
  margin-bottom: 0px;
  font-size: 80%;
}

.invalidInput {
  border-color: #dc3545;
}

.invalidInput:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220,53,69,.25);
}

.desTextarea {
  height: 38px;
  min-height: 38px;
  max-height: 150px;
  overflow: scroll;
  border: 1px solid #ced4da;
  color: #495057;
  padding: .375rem .75rem;
  font-size: 1rem;
}

.desTextarea:focus {
  color: #495057;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

.desDiv {
  min-height: 90px;
}
</style>

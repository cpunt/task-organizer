<template>
<div class='container my-5 card card-body shadow w-75'>
  <h3 class='text-center'>New Task</h3>
  <div class='taskInputDiv'>
    <label class='w-100 labelHeight'>Task Parent:
      <select class='form-control mb-3' v-model='taskParent'>
        <option :value='null'></option>
        <option v-for='(taskObj, index) in taskPaths()' :value='taskObj.task' :key='index'>{{ taskObj.path.join('/') }}</option>
      </select>
    </label>
  </div>

  <div class='taskInputDiv'>
    <label class='w-100 labelHeight'>Task:
      <input v-model='task' class='form-control' type='text' maxlength='50' :class='{ invalidInput: errors.task }'>
    </label>
    <p v-if='errors.task' class='invalidFeedback'>*Tasks length needs to be between 3-50 characters</p>
  </div>

  <div class='taskInputDiv'>
    <label class='w-100 labelHeight'>Timeframe:
      <select class='form-control'  v-model='timeframe' :class='{ invalidInput: errors.timeframe }'>
        <option selected hidden disabled value=''></option>
        <option v-for='timeframeOption in timeframeOptions' :key='timeframeOption' :value='timeframeOption'>{{ capitalizeFirstLetter(timeframeOption) }}</option>
      </select>
    </label>
    <p v-if='errors.timeframe' class='invalidFeedback'>*Timeframe needs to be selected</p>
  </div>

  <div class='taskInputDiv'>
    <label class='w-100 labelHeight'>Start Date:
      <input v-model='startDate'
             class='form-control'
             type='date'
             :min='startDateMin'
             :max='startDateMax'
             :class='{ invalidInput: errors.startDate }'
      >
    </label>
    <p v-if='errors.startDate' class='invalidFeedback'>*Start Date needs to be between {{ formatDate(startDateMin) }} - {{ formatDate(startDateMax) }}</p>
  </div>

  <div class='taskInputDiv'>
    <label class='w-100 labelHeight'>End Date:
      <input v-model='endDate'
             class='form-control'
             type='date'
             :min='endDateMin'
             :max='endDateMax'
             :class='{ invalidInput: errors.endDate }'
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
import { taskPaths, cancelTask, createTask, validateTasks, setStartDate } from '../js/createTask/createTaskMethods.js';
import { startDateMin, startDateMax, endDateMin, endDateMax } from '../js/createTask/createTaskComputed.js';
import { taskParent, task, timeframe, startDate, endDate } from '../js/createTask/createTaskWatchers.js';
import { capitalizeFirstLetter, formatDate } from '../js/sharedFunctions.js';

export default {
  name: 'CreateTask',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      timeframe: '',
      startDate: '',
      endDate: '',
      task: '',
      taskParent: null,
      timeframeOptions: ['yearly', 'monthly', 'weekly', 'daily'],
      errors: {
        task: false,
        timeframe: false,
        startDate: false,
        endDate: false
      }
    }
  },
  watch: {
    taskParent,
    task,
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
    setStartDate
  },
  computed: {
    startDateMin,
    startDateMax,
    endDateMin,
    endDateMax
  },
  beforeMount(){
    window.scrollTo(0,0);
    this.setStartDate();
  }
}
</script>

<style scoped>
.labelHeight {
  height: 65px;
  margin-bottom: 0px;
}

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
</style>

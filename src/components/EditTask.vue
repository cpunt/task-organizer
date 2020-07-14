<template>
<div class='text-left'>
  <img class='float-left icon' src='../assets/close-cross.svg' alt='Close' title='Close' @click='cancel'>
  <h3 class='text-center mb-0'>Edit Task</h3>

  <div class='taskDiv'>
    <div class='taskInputDiv'>
      <label class='w-100 mb-0 '>Task Parent:
        <select class='form-control mb-0' disabled>
          <option :value='taskParent'>{{ taskParent == null ? taskParent : taskParent.task }}</option>
        </select>
      </label>
    </div>

    <div class='taskInputDiv'>
      <label class='w-100 mb-0'>Task:
        <input v-model='task' type='text' class='form-control' :class='{ invalidInput: errors.task }' maxlength='50' >
      </label>
      <p v-if='errors.task' class='invalidFeedback'>*Task length needs to be between 3-50 characters</p>
    </div>

    <div class='desDiv'>
      <label class='w-100 mb-0'>Description:
        <textarea v-model='description' class='desTextarea rounded w-100' :class='{ invalidInput: errors.description }' maxlength='500' placeholder='(optional)'>
        </textarea>
      </label>
      <p v-if='errors.description' class='invalidFeedback'>*Description needs to be between 0-500 characters</p>
    </div>

    <div class='taskInputDiv'>
      <label class='w-100 mb-0'>Timeframe:
        <select v-model='timeframe' class='form-control' :class='{ invalidInput: errors.timeframe }' disabled>
          <option value='yearly'>Yearly</option>
          <option value='monthly'>Monthly</option>
          <option value='weekly'>Weekly</option>
          <option value='daily'>Daily</option>
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
      <button type='button' class='btn btn-primary mx-2' @click='cancelEdit'>Cancel</button>
      <button type='button' class='btn btn-primary mx-2' @click='confirmDeleteTask(taskId)'>Delete Task</button>
      <button type='button' class='btn btn-primary mx-2' @click='updateTask'>Update Task</button>
    </div>
  </div>
</div>
</template>

<script>
import { startDateMin, startDateMax, endDateMin, endDateMax } from '../js/newTask/newTaskComputed.js';
import { task, description, timeframe, startDate, endDate } from '../js/newTask/newTaskWatchers.js';
import { validateTasks } from '../js/newTask/newTaskMethods.js';
import { validateChildrenDates, updateTask, getDateTaskCompleted, getTaskCompleted, cancelEdit } from '../js/editTask/editTaskMethods.js';
import { cancel, confirmDeleteTask } from '../js/sharedMethods.js';
import { formatDate } from '../js/sharedFunctions.js';
import { updateTaskDB } from '../js/server/firestore.js';
import { mapState } from 'vuex'

export default {
  name: 'EditTask',
  props: {
    taskobj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      task: this.taskobj.task,
      description: this.taskobj.description,
      timeframe: this.taskobj.time.timeframe,
      startDate: this.taskobj.time.startDate,
      endDate: this.taskobj.time.endDate,
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
    task,
    description,
    timeframe,
    startDate,
    endDate
  },
  methods: {
    validateTasks,
    validateChildrenDates,
    updateTask,
    getDateTaskCompleted,
    getTaskCompleted,
    cancelEdit,
    cancel,
    confirmDeleteTask,
    formatDate,
    updateTaskDB
  },
  computed: {
    startDateMin,
    startDateMax,
    endDateMin,
    endDateMax,
    taskParent() {
      return this.tasks[this.taskobj.parent] ? this.tasks[this.taskobj.parent] : null;
    },
    ...mapState([
      'tasks',
      'taskId',
      'display'
    ])
  }
}
</script>

<style scoped>
.taskInputDiv {
  margin-left: auto;
  margin-right: auto;
  height: 80px;
}

.icon {
  cursor: pointer;
  height: 24px;
  position: absolute;
}

.desTextarea {
  height: 38px;
  min-height: 38px;
  max-height: 98px;
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
  min-height: 70px;
  max-height: 200px;
  margin-left: auto;
  margin-right: auto;
}

.taskDiv {
  width: 92%;
  margin-left: auto;
  margin-right: auto;
}

.invalidFeedback {
  margin-bottom: 0px;
  text-align: left;
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

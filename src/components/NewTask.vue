<template>
<div class='newTaskDiv card card-body shadow'>
  <img class='float-left icon' src='../assets/close-cross.svg' alt='Close' title='Close' @click='cancel'>
  <h3 class='text-center mb-0 header'>New Task</h3>

  <div class='taskDiv'>
    <div class='taskInputDiv'>
      <label class='w-100 mb-0 header'>Task Parent:
        <select class='form-control mb-0' v-model='parentId'>
          <option value=''></option>
          <option v-for='pathObj in taskPaths' :value='pathObj.id' :key='pathObj.id'>{{ pathObj.path }}</option>
        </select>
      </label>
    </div>

    <div class='taskInputDiv'>
      <label class='w-100 mb-0 header'>Task:
        <input v-model='task' class='form-control' :class='{ invalidInput: errors.task }' type='text' maxlength='50'>
      </label>
      <p v-if='errors.task' class='invalidFeedback'>*Tasks length needs to be between 3-50 characters</p>
    </div>

    <div class='desDiv'>
      <label class='w-100 mb-0 header'>Description:
        <textarea v-model='description' class='desTextarea rounded w-100' :class='{ invalidInput: errors.description }' maxlength='500' placeholder='(optional)' >
        </textarea>
      </label>
      <p v-if='errors.description' class='invalidFeedback'>*Description needs to be between 0-500 characters</p>
    </div>

    <div class='taskInputDiv'>
      <label class='w-100 mb-0 header'>Timeframe:
        <select v-model='timeframe' class='form-control text-capitalize' :class='{ invalidInput: errors.timeframe }'>
          <option selected hidden disabled value=''></option>
          <option v-for='val in timeframes' :key='val' :value='val'>{{ val }}</option>
        </select>
      </label>
      <p v-if='errors.timeframe' class='invalidFeedback'>*Timeframe needs to be selected</p>
    </div>

    <div class='taskInputDiv'>
      <label class='mb-0 w-100 header'>Start Date:
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
      <label class='mb-0 w-100 header'>End Date:
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
      <button class='btn btn-primary mx-2' @click='cancel'>Cancel</button>
      <button class='btn btn-primary mx-2' @click='createTask'>Create Task</button>
    </div>
  </div>
</div>
</template>

<script>
import { startDateMin, startDateMax, endDateMin, endDateMax } from '../js/newTask/newTaskComputed.js';
import { parentId, task, description, timeframe, startDate, endDate } from '../js/newTask/newTaskWatchers.js';
import { createTask, validateTasks, setStartDate } from '../js/newTask/newTaskMethods.js';
import { formatDate } from '../js/sharedFunctions.js';
import { cancelByEsc } from '../js/sharedMethods.js';
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NewTask',
  data() {
    return {
      task: '',
      description: '',
      timeframe: '',
      startDate: '',
      endDate: '',
      parentId: '',
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
    parentId,
    task,
    description,
    timeframe,
    startDate,
    endDate,
    startDateMin () {
      //Update start date
      this.setStartDate();
    },
    taskId: {
      immediate: true,
      handler (val) {
        this.parentId = val;
      }
    }
  },
  methods: {
    ...mapActions('display', [
      'cancel'
    ]),
    createTask,
    validateTasks,
    setStartDate,
    formatDate,
    cancelByEsc
  },
  computed: {
    startDateMin,
    startDateMax,
    endDateMin,
    endDateMax,
    taskPaths () {
      let paths = [];
      let map = {};
      let node, parentId;

      for (const key in this.tasks) {
        node = this.tasks[key];
        map['id'] = key;
        map['path'] = node.task;

        while (node != null) {
          parentId = node.parent;
          if(parentId) {
            node = this.tasks[parentId];
            map['path'] = `${node.task}/${map['path']}`;
          } else {
            node = null;
          }
        }
        paths.push(map);
        map = {};
      }

      return paths.sort((a,b) =>  {
        return a.path == b.path ? 0 : a.path > b.path || -1
      });
    },
    timeframes () {
      const node = this.parentId ? this.tasks[this.parentId] : null;
      let timeframesArr = ['yearly', 'monthly', 'weekly', 'daily'];

      if (node) {
        switch(node.time.timeframe) {
          case 'monthly':
            timeframesArr = timeframesArr.slice(1);
            break;
          case 'weekly':
            timeframesArr = timeframesArr.slice(2);
            break;
          case 'daily':
            timeframesArr = timeframesArr.slice(3);
            break;
        }
      }

      return timeframesArr;
    },
    taskParent () {
      return this.tasks[this.taskId] ? this.tasks[this.taskId] : null;
    },
    ...mapState('tasks', [
      'tasks'
    ]),
    ...mapState('display', [
      'taskId',
    ])
  },
  mounted () {
    this.setStartDate();
    document.addEventListener('keyup', this.cancelByEsc);
  }
}
</script>

<style scoped>
.newTaskDiv {
  position: absolute;
  width: 60%;
  z-index:100;
  top: 4%;
  left: 20%;
}

.taskDiv {
  width: 92%;
  margin-left: auto;
  margin-right: auto;
}

.taskInputDiv {
  height: 80px;
}

.dateDiv {
  display: inline-block;
  vertical-align: top;
  width: 50%;
}

.icon {
  cursor: pointer;
  height: 24px;
  width: 24px;
  position: absolute;
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
  max-height: 78px;
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

.header {
  color: #37474F
}
</style>

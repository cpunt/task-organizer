<template>
<div class='viewTaskDiv rounded bg-primary'>
  <img class='float-left icon ml-1' src='../assets/close-cross.svg' alt='Close' title='Close' @click='closeTask'>

  <div v-if='!edit' class='taskDiv mb-2'>
    <h2 class='mb-3'>{{ task.task }}</h2>

    <div class='text-center'>
      <h5 class='mb-2 ml-1'>{{ formatDate(task.time.startDate) }} - {{ formatDate(task.time.endDate) }}</h5>
    </div>

    <div v-if='task.description.length > 0' class='text-left mb-3'>
      <div class='rounded desDiv w-75'>
        <h5 class='mb-0 text-center sticky-top bg-primary'><u>Description</u></h5>
        <p class='ml-1 mb-0 d-inline'>{{ task.description }}</p>
      </div>
    </div>

    <div v-if='task.children.length > 0' class='text-left mb-3'>
      <div class='w-75 rounded subTaskDiv'>
        <h5 class='mb-0 text-center sticky-top bg-primary'><u>Sub Tasks</u></h5>
        <p v-for='(subTaskObj, index) in getSubTasks' :key='index' class='ml-1 mb-0'>{{ subTaskObj.task }}</p>
      </div>
    </div>

    <div v-else class='mb-3'>
      <button type='button' class='btn btn-info w-25 mt-2 btnBorder' @click='toggleTaskCompleted'>
        <p class='mb-0' v-if='!task.taskCompleted'>Complete Task</p>
        <p class='mb-0' v-else>Uncomplete Task</p>
      </button>
    </div>
  </div>

  <EditTask v-else class='taskDiv' :taskobj='task' @cancel-edit='toggleEdit' @close-task='closeTask'></EditTask>

  <div class='taskOpBar'>
    <img v-if='!edit' class='opBarIcons mb-4' src='../assets/edit.svg' alt='Edit' title='Edit' @click='toggleEdit'>
    <img class='opBarIcons mb-4' src='../assets/delete.svg' alt='Delete' title='Delete' @click='deleteTask'>
    <img class='opBarIcons' src='../assets/add.svg' alt='Add' title='Add'>
  </div>
</div>
</template>

<script>
import EditTask from './EditTask.vue';

import { toggleTaskCompleted } from '../js/timeframe/timeframeMethods.js';
import { addZero } from '../js/sharedFunctions.js';
import { nodeDFS } from '../js/nodeFunctions.js';

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      edit: false
    }
  },
  methods: {
    toggleTaskCompleted,
    formatDate(dateStr) {
      const date = new Date(dateStr),
            day = addZero(date.getDate()),
            month = addZero(date.getMonth() + 1),
            year = addZero(date.getFullYear());

      return `${day}/${month}/${year}`;
    },
    closeTask() {
      this.$emit('close-task', null);
    },
    deleteTask() {
      const con = confirm('This will delete all task occurences and subtasks. Click OK to confirm deletion.');

      if(con) {
        this.$emit('delete-task', this.task);
      }
    },
    toggleEdit() {
      this.edit = !this.edit;
    }
  },
  computed: {
    getSubTasks() {
      const tasks = [],
            currentTask = this.task.task;

      nodeDFS(function(node) {
        if(node.task != currentTask && node.children.length == 0) {
          tasks.push(node);
        }
      }, this.task);

      return tasks;
    }
  },
  components: {
    EditTask
  }
}
</script>

<style scoped>
.viewTaskDiv {
  position: fixed;
  width: 60%;
  z-index:100;
  border: 2px solid black;
  top: 14%;
  left: 20%;
  color: white;
}

.icon {
  cursor: pointer;
  height: 24px;
}

.taskDiv {
  width: 92%;
}

.taskDiv, .taskOpBar {
  display: inline-block;
  vertical-align: middle;
}

.opBarIcons {
  display: block;
  cursor: pointer;
  height: 24px;
}

.desDiv, .subTaskDiv {
  overflow: scroll;
  border: 2px solid white;
  margin-left: auto;
  margin-right: auto;
  max-height: 150px;
}
</style>

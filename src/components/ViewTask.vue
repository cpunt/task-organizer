<template>
<div class='viewTaskDiv card card-body shadow'>
  <div v-if='!edit'>
    <div class='taskOpBar'>
      <img class='opBarIcons mb-4' src='../assets/close-cross-gray.svg' alt='Close' title='Close' @click='cancel'>
      <img class='opBarIcons mb-4' src='../assets/edit-gray.svg' alt='Edit' title='Edit' @click='toggleEdit'>
      <img class='opBarIcons mb-4' src='../assets/delete-gray.svg' alt='Delete' title='Delete' @click='deleteTask'>
      <img class='opBarIcons' src='../assets/add-gray.svg' alt='Add' title='Add' @click='addTask'>
    </div>

    <div class='taskDiv'>
      <h2 class='mb-3'>{{ task.task }}</h2>

      <div class='text-center'>
        <h5 class='mb-2 ml-1'>{{ formatDate(task.time.startDate) }} - {{ formatDate(task.time.endDate) }}</h5>
      </div>

      <div v-if='task.description.length > 0' class='text-left mb-3'>
        <div class='rounded desDiv w-75'>
          <h5 class='mb-0 text-center sticky-top'><u>Description</u></h5>
          <p class='ml-1 mb-0 d-inline'>{{ task.description }}</p>
        </div>
      </div>

      <div v-if='task.children.length > 0' class='text-left mb-3'>
        <div class='w-75 rounded subTaskDiv'>
          <h5 class='mb-0 text-center sticky-top'><u>Sub Tasks</u></h5>
          <p v-for='(subTaskObj, index) in getSubTasks' :key='index' class='ml-1 mb-0'>{{ subTaskObj.task }}</p>
        </div>
      </div>

      <div v-else class='text-center btnDiv'>
        <button type='button' class='btn btn-primary' @click='toggleTaskCompleted'>
          <p class='mb-0' v-if='!task.taskCompleted'>Complete Task</p>
          <p class='mb-0' v-else>Uncomplete Task</p>
        </button>
      </div>
    </div>
  </div>

  <EditTask v-else :taskobj='task'></EditTask>

</div>
</template>

<script>
import EditTask from './EditTask.vue';

import { toggleTaskCompleted } from '../js/timeframe/timeframeMethods.js';
import { addZero } from '../js/sharedFunctions.js';
import { nodeDFS } from '../js/nodeFunctions.js';

export default {
  name: 'ViewTask',
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
    cancel() {
      this.$emit('cancel');
    },
    deleteTask() {
      this.$emit('confirm-delete-task', this.task);
    },
    addTask() {
      this.$emit('add-task', this.task);
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    cancelByEsc(e) {
      if(e.keyCode == '27') {
        document.removeEventListener('keyup', this.cancelByEsc);
        this.cancel()
      }
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
  },
  mounted() {
    document.addEventListener('keyup', this.cancelByEsc);
  }
}
</script>

<style scoped>
.viewTaskDiv {
  position: absolute;
  width: 60%;
  z-index:100;
  top: 4%;
  left: 20%;
  min-height: 210px;
}

.icon {
  cursor: pointer;
  height: 24px;
  position: absolute;
}

.taskDiv {
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  min-height: 168px;
  position: relative;
}

.btnDiv {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.taskOpBar {
  position: absolute;
}

.opBarIcons {
  display: block;
  cursor: pointer;
  height: 24px;
}

.desDiv, .subTaskDiv {
  overflow: scroll;
  border: 2px solid gray;
  margin-left: auto;
  margin-right: auto;
  max-height: 150px;
}
</style>

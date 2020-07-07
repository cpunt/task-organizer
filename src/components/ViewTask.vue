<template>
<div class='viewTaskDiv card card-body shadow'>
  <div v-if='!edit'>
    <div class='taskOpBar'>
      <img class='opBarIcons mb-4' src='../assets/close-cross.svg' alt='Close' title='Close' @click='cancel'>
      <img class='opBarIcons mb-4' src='../assets/edit.svg' alt='Edit' title='Edit' @click='toggleEdit'>
      <img class='opBarIcons mb-4' src='../assets/delete.svg' alt='Delete' title='Delete' @click='confirmDeleteTask'>
      <img class='opBarIcons' src='../assets/add.svg' alt='Add' title='Add' @click='addTask'>
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

  <EditTask v-else
            :taskid='taskid'
            :taskobj='task'
            :tasks='tasks'
            @cancel='cancel'
            @confirm-delete-task='confirmDeleteTask'
  >
  </EditTask>

</div>
</template>

<script>
import EditTask from './EditTask.vue';

import { toggleTaskCompleted } from '../js/timeframe/timeframeMethods.js';
import { formatDate } from '../js/sharedFunctions.js';
import { addTask, cancel, cancelByEsc, confirmDeleteTask } from '../js/sharedMethods.js';
import { toggleEdit } from '../js/viewTask/viewTaskMethods.js';
import { getSubTasks } from '../js/viewTask/viewTaskComputed.js';

export default {
  name: 'ViewTask',
  props: {
    taskid: {
      type: String,
      required: true
    },
    tasks: {
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
    formatDate,
    toggleEdit,
    addTask,
    cancel,
    cancelByEsc,
    confirmDeleteTask
  },
  computed: {
    getSubTasks,
    task() {
      return this.tasks[this.taskid];
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

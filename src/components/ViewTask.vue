<template>
<div class='viewTaskDiv card card-body shadow'>
  <div v-if='!edit' class='viewDiv'>
    <div class='optionsBar'>
      <img class='icon mb-4' src='../assets/close-cross.svg' alt='Close' title='Close' @click='cancel'>
      <img class='icon mb-4' src='../assets/edit.svg' alt='Edit' title='Edit' @click='toggleEdit'>
      <img class='icon mb-4' src='../assets/delete.svg' alt='Delete' title='Delete' @click='confirmDeleteTask(taskId)'>
      <img class='icon mb-4' src='../assets/add.svg' alt='Add' title='Add' @click='addTask(taskId)'>
    </div>

    <h3><u>{{ task.task }}</u></h3>
    <div class='infoDiv text-left'>
      <p class='my-2 text-capitalize'><b><u>Timeframe</u></b><br> {{ task.time.timeframe }}</p>
      <p class='my-2'><b><u>Start Date</u></b><br> {{ formatDate(task.time.startDate) }}</p>
      <p class='my-2'><b><u>End Date</u></b><br> {{ formatDate(task.time.endDate) }}</p>
      <p class='my-2' v-if='task.description.length > 0'><b><u>Description</u></b><br> {{ task.description }}</p>
      <p class='my-2' v-if='task.parent'><b><u>Task Parent</u></b><br> {{ tasks[task.parent].task }}</p>

      <div class='my-2' v-if='task.children.length > 0'>
        <p class='my-1'><b><u>Sub Tasks</u></b></p>
        <ul>
          <li v-for='(subTaskObj, index) in getSubTasks' :key='index' class='my-1'>{{ subTaskObj.task }}</li>
        </ul>
      </div>
      <div v-else class='text-center'>
        <div class='progressBarDiv text-center my-2'>
          <p class='pBText my-0'>{{ tasksCompleted }} / {{ totalTasks }}</p>
          <div class='progress my-0 barDiv progressBar'>
            <div class='progress-bar progressBarPercent' role='progressbar' :style='{ width: `${percent}%` }' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
          </div>
        </div>
        <button type='button' class='btn btn-primary' @click='updateTaskCompleted'>
          <p class='mb-0' v-if='!task.taskCompleted'>Complete Task</p>
          <p class='mb-0' v-else>Uncomplete Task</p>
        </button>
      </div>
    </div>
  </div>
  <EditTask v-else
            :taskobj='task'
  />

</div>
</template>

<script>
import EditTask from './EditTask.vue';
import { formatDate } from '../js/sharedFunctions.js';
import { cancelByEsc } from '../js/sharedMethods.js';
import { toggleEdit } from '../js/viewTask/viewTaskMethods.js';
import { getSubTasks } from '../js/viewTask/viewTaskComputed.js';
import { getDateIndex } from '../js/app/appFunctions.js';
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ViewTask',
  data() {
    return {
      edit: false
    }
  },
  methods: {
    ...mapActions('display', [
      'cancel',
      'addTask',
      'confirmDeleteTask'
    ]),
    formatDate,
    toggleEdit,
    cancelByEsc,
    updateTaskCompleted() {
      this.$store.dispatch('tasks/updateTaskCompleted', this.taskId);
    }
  },
  computed: {
    getSubTasks,
    task () {
      return this.tasks[this.taskId];
    },
    ...mapState('display', [
      'taskId'
    ]),
    ...mapState('tasks', [
      'tasks'
    ]),
    tasksCompleted () {
      return Object.keys(this.task.dateTaskCompleted).length;
    },
    totalTasks () {
      const dateIndex = getDateIndex(this.task.time.timeframe, new Date(this.task.time.startDate),  new Date(this.task.time.endDate));
      return dateIndex + 1;
    },
    percent () {
      return this.tasksCompleted / this.totalTasks * 100;
    }
  },
  components: {
    EditTask
  },
  mounted () {
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
  min-height: 240px;
  max-height: 630px;
  overflow: scroll;
}

.icon {
  cursor: pointer;
  height: 24px;
  width: 24px;
  position: relative;
  display: block;
}

.optionsBar {
  position: absolute;
  width: 24px;
}

.viewDiv {
  color: #37474F;
  text-align: center;
}

.infoDiv {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}

.progressBarDiv {
  position: relative;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.barDiv, .progressBarDiv {
  height: 25px;
}

.pBText {
  position: absolute;
  line-height: 25px;
  width: 100%
}

.progressBar {
  background-color: #A8E9A8;
}

.progressBarPercent {
  background-color: #66bb6a;
}
</style>

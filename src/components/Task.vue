<template>
<div class='text-center'>
  <div class='taskDiv card card-body shadow-sm rounded p-0' :class="{ highlightTask: task.highlight == true }" @mouseover='highlightTasks' @mouseleave='unhighlightTasks'>
    <p class='mb-1 taskHeader'>{{ task.task }}</p>

    <div v-if='task.children.length > 0' class='progressBarDiv text-center my-2'>
      <p class='pBText my-0'>{{ leavesCompleted }} / {{ leaves }}</p>
      <div class='progress my-0 barDiv progressBar'>
        <div class='progress-bar progressBarPercent' role='progressbar' :style='{ width: `${percent}%` }' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
      </div>
    </div>

    <div class='taskOpBar'>
      <img class='opBarIcons' src='../assets/eye-open.svg' alt='View' title='View' @click='viewTask(); unhighlightTasks()'>
      <img class='opBarIcons' src='../assets/delete.svg' alt='Delete' title='Delete' @click='confirmDeleteTask(); unhighlightTasks()'>
      <img class='opBarIcons' src='../assets/add.svg' alt='Add' title='Add' @click='addTask(); unhighlightTasks()'>
      <span class='checkBoxDiv rounded' :class="{ 'bgChecked': task.dateTaskCompleted[completedIndex], 'bgUnchecked': !task.dateTaskCompleted[completedIndex] }" v-if='task.children.length == 0' @click='toggleDateTaskCompleted' title='Toggle Check'></span>
      <span class='caret opBarIcons' :class="{ 'caret-down': showChildren }" v-if='taskHasValidChild' @click='toggleShowChildren' title='Toggle Children'></span>
    </div>
  </div>

  <TasksDate v-if='showChildren ' :tasks='task.children' :date='date' :timeframe='timeframe' v-on='$listeners'></TasksDate>
</div>
</template>


<script>
import { completedIndex, taskHasValidChild, leaves, leavesCompleted, percent, expired } from '../js/timeframe/timeframeComputed.js';
import { toggleDateTaskCompleted, toggleTaskCompleted, toggleShowChildren, } from '../js/timeframe/timeframeMethods.js';
import { addTask, confirmDeleteTask } from '../js/sharedMethods.js';
import { viewTask, highlightTasks, unhighlightTasks } from '../js/task/taskMethods.js';

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    timeframe: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showChildren: false
    }
  },
  watch: {
    percent(val) {
      this.task.taskCompleted = val == 100;
    }
  },
  methods: {
    toggleDateTaskCompleted,
    toggleTaskCompleted,
    toggleShowChildren,
    addTask,
    confirmDeleteTask,
    viewTask,
    highlightTasks,
    unhighlightTasks
  },
  computed: {
    completedIndex,
    taskHasValidChild,
    leaves,
    leavesCompleted,
    percent,
    expired
  },
  components: {
    TasksDate: () => import('./TasksDate.vue')
  }
}
</script>


<style scoped>
.taskDiv {
  width: 200px;
  margin-left: 5px;
  margin-bottom: 3px;
  cursor: pointer;
  border: 1px solid #f8f9fa;
}

.taskHeader {
  color: #37474F;
}

.taskOpBar {
  border-top: 1px solid #37474F;
  height: 22px;
  position: relative;
}

.checkBoxDiv {
  width: 18px;
  display: inline-block;
}

.opBarIcons, .checkBoxDiv {
  vertical-align: top;
  margin-top: 2px;
  cursor: pointer;
  height: 18px;
  margin-left: 8px;
  margin-right: 8px;
}

.highlightTask {
  border: 1px solid #263238;
}

.bgChecked {
  background-color: #66bb6a;
}

.bgUnchecked {
  background-color: #ef5350;
}

.progressBarDiv {
  position: relative;
  height: 30px;
}

.progressBar {
  background-color: #81c784;
}

.progressBarPercent {
  background-color: #66bb6a;
}

.pBText {
  position: absolute;
  line-height: 30px;
  width: 100%
}

.barDiv {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: 30px;
}
</style>

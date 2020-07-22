<template>
<div class='text-center'>
  <div class='taskDiv card card-body shadow-sm rounded p-0'
  >
    <p class='mb-1 taskHeader'>{{ task.task }}</p>

    <div v-if='task.children.length > 0' class='progressBarDiv text-center mb-1'>
      <p class='pBText my-0'>{{ leavesCompleted }} / {{ leaves }}</p>
      <div class='progress my-0 barDiv progressBar'>
        <div class='progress-bar progressBarPercent' role='progressbar' :style='{ width: `${percent}%` }' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
      </div>
    </div>

    <div class='taskOpBar'>
      <img class='opBarIcons' src='../assets/eye-open.svg' alt='View' title='View' @click='viewTask(); unhighlightTasks()'>
      <img class='opBarIcons' src='../assets/delete.svg' alt='Delete' title='Delete' @click='confirmDeleteTask(taskid); unhighlightTasks()'>
      <img class='opBarIcons' src='../assets/add.svg' alt='Add' title='Add' @click='addTask(taskid); unhighlightTasks()'>
      <span class='checkBoxDiv rounded' :class="{ 'bgChecked': task.dateTaskCompleted[completedIndex], 'bgUnchecked': !task.dateTaskCompleted[completedIndex] }" v-if='task.children.length == 0' @click='updateDateTaskCompleted' title='Toggle Check'></span>

      <div v-if='taskHasValidChild' class='d-inline'>
        <img v-if='showChildren' class='opBarIcons angle' src='../assets/angle-down.svg' alt='Angle Down' title='Hide Children' @click='toggleShowChildren'>
        <img v-else class='opBarIcons angle' src='../assets/angle-right.svg' alt='Angle Right' title='Toggle Children' @click='toggleShowChildren'>
      </div>
    </div>
  </div>

  <TasksDate v-if='showChildren'
             :tasksids='task.children'
             :date='date'
             :timeframe='timeframe'
  >
  </TasksDate>
</div>
</template>

<!--
Add back to div
:class="{ highlightTask: task.highlight }"
@mouseover='highlightTasks'
@mouseleave='unhighlightTasks'
-->

<script>
import { completedIndex, taskHasValidChild, leaves, leavesCompleted, percent, expired } from '../js/timeframe/timeframeComputed.js';
import { toggleShowChildren, } from '../js/timeframe/timeframeMethods.js';
import { addTask, confirmDeleteTask } from '../js/sharedMethods.js';
import { highlightTasks, unhighlightTasks } from '../js/task/taskMethods.js';
import { mapState } from 'vuex'

export default {
  name: 'Task',
  props: {
    taskid: {
      type: String,
      required: true
    },
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
    // task: {
    //   handler(val) {
    //     console.log(val);
    //     console.log('I changed');
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    toggleShowChildren,
    addTask,
    highlightTasks,
    unhighlightTasks,
    viewTask() {
      this.$store.commit('SET_DISPLAY', { bgScreen: true, vtask: true });
      this.$store.commit('SET_TASKID', { taskId: this.taskid})
    },
    confirmDeleteTask,
    updateDateTaskCompleted() {
      this.$store.dispatch('tasks/updateDateTaskCompleted', {
        task: this.task,
        taskId: this.taskid,
        completedIndex: this.completedIndex
      });
    }
   },
  computed: {
    completedIndex,
    taskHasValidChild,
    leaves,
    leavesCompleted,
    percent,
    expired,
    ...mapState([
      'sidebar'
    ]),
    ...mapState('tasks', [
      'tasks'
    ])
  },
  components: {
    TasksDate: () => import('./TasksDate.vue')
  }
}
</script>


<style scoped>
.taskDiv {
  width: 175px;
  margin-left: 5px;
  margin-bottom: 3px;
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
  margin-left: 10px;
  margin-right: 10px;
}

.angle {
  width: 12px;
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
}

.progressBar {
  background-color: #81c784;
}

.progressBarPercent {
  background-color: #66bb6a;
}

.pBText {
  position: absolute;
  line-height: 25px;
  width: 100%
}

.barDiv {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}

.barDiv, .progressBarDiv {
  height: 25px;
}
</style>

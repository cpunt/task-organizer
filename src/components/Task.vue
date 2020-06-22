<template>
<div>
  <div class='rounded text-light taskDiv text-center bg-primary'>
    <p class='font-weight-bold mb-0'>{{ task.task }}</p>

    <div v-if='task.children.length > 0' class='progressBarDiv'>
      <div class='pBTextDiv w-100'>
        <p class='text-center mt-1 mb-0'>{{ leavesCompleted }} / {{ leaves }}</p>
      </div>
      <div class='progress my-2 barDiv progressBar'>
        <div class='progress-bar bg-success' role='progressbar' :style='{ width: `${percent}%` }' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
      </div>
    </div>

    <div class='taskOpBar'>
      <img class='opBarIcons' src='../assets/eye-open.svg' alt='View' title='View' @click='viewTask'>
      <img class='opBarIcons' src='../assets/delete.svg' alt='Delete' title='Delete' @click='deleteTask'>
      <!-- <img class='opBarIcons' src='../assets/edit.svg' alt='Edit' title='Edit'> -->
      <img class='opBarIcons' src='../assets/add.svg' alt='Add' title='Add' @click='addTask'>
      <span class='checkBoxDiv rounded' :class="{ 'bg-success': task.dateTaskCompleted[completedIndex], 'bg-danger': !task.dateTaskCompleted[completedIndex] }" v-if='task.children.length == 0' @click='toggleDateTaskCompleted' title='Toggle Check'></span>
      <span class='caret opBarIcons' :class="{ 'caret-down': showChildren }" v-if='taskHasValidChild' @click='toggleShowChildren' title='Toggle Children'></span>
    </div>
  </div>

  <TasksDate v-if='showChildren ' :tasks='task.children' :date='date' :timeframe='timeframe' v-on='$listeners'></TasksDate>
</div>
</template>


<script>
import { toggleDateTaskCompleted, toggleTaskCompleted, toggleShowChildren, } from '../js/timeframe/timeframeMethods.js';
import { completedIndex, taskHasValidChild, leaves, leavesCompleted, percent, expired } from '../js/timeframe/timeframeComputed.js';

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
    viewTask() {
      this.$emit('view-task', this.task);
    },
    deleteTask() {
      const con = confirm('This will delete all task occurences and subtasks. Click OK to confirm deletion.');

      if(con) {
        this.$emit('delete-task', this.task);
      }
    },
    addTask() {
      this.$emit('add-task', this.task);
    }
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
.checkBoxDiv {
  cursor: pointer;
  height: 20px;
  width: 20px;
  background-color: #bbb;
  border: 2px solid black;
  display: inline-block;
  vertical-align: middle;
}

.opBarIcons {
  cursor: pointer;
  height: 18px;
}

.opBarIcons, .checkBoxDiv {
  margin-left: 8px;
  margin-right: 8px;
}

.taskOpBar {
  border-top: 2px solid black;
  height: 30px;
  text-align: center;
}

.taskDiv {
  width: 200px;
  margin-left: 5px;
  margin-bottom: 3px;
  border: 2px solid black;
}

.progressBarDiv {
  position: relative;
}

.pBTextDiv {
  position: absolute;
  height: 30px;
}

.barDiv {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  border: 2px solid black;
  height: 30px;
}

.progressBar {
  /* background-color: #138496; */
  background-color: #218838;
}

.headerCompleted {
  text-decoration: line-through;
}
</style>

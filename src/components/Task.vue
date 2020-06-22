<template>
<div>
  <!-- <div class='rounded text-light taskDiv text-center' :class="{'bg-success': task.dateTaskCompleted[completedIndex] || task.taskCompleted, 'bg-primary': !expired, 'bg-danger': expired && !task.dateTaskCompleted[completedIndex] && !task.taskCompleted, highlightTask: task.highlight }" :hover='highlightTasks'> -->
  <div class='rounded text-light taskDiv text-center bg-primary' :class="{ highlightTask: task.highlight == true }" @mouseover='highlightTasks' @mouseleave='unhighlightTasks'>
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
import { nodeBFS } from '../js/nodeFunctions.js';

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
      this.unhighlightTasks();

      this.$emit('view-task', this.task);
    },
    deleteTask() {
      this.unhighlightTasks();
      this.$emit('confirm-delete-task', this.task);
    },
    addTask() {
      this.unhighlightTasks();

      this.$emit('add-task', this.task);
    },
    highlightTasks() {
      if(!this.task.highlight) {
        let parent = this.task.parent;
        while(parent != null) {
          parent.highlight = true;
          parent = parent.parent;
        }

        nodeBFS(function(node) {
          node.highlight = true;
        }, this.task);
      }
    },
    unhighlightTasks() {
      if(this.task.highlight) {
        let parent = this.task.parent;
        while(parent != null) {
          parent.highlight = false;
          parent = parent.parent;
        }

        nodeBFS(function(node) {
          node.highlight = false;
        }, this.task);
      }
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

.highlightTask {
  border: 2px solid red;
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
  background-color: #218838;
}

.headerCompleted {
  text-decoration: line-through;
}
</style>

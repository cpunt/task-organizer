<template>
<div class='viewTaskDiv rounded' :class="{'bg-primary': !task.taskCompleted, 'bg-success': task.taskCompleted}">
  <h2>{{ task.task }}</h2>

  <div class='mb-2'>
    <h4>Time</h4>
    <div class='innerDiv rounded'>
      <p class='mb-0 innerDivText'>Timeframe: {{ task.time.timeframe }}</p>
      <p class='mb-0 innerDivText'>Date: {{ task.time.startDate }} - {{ task.time.endDate }}</p>
    </div>
  </div>

  <div class='mb-2'>
    <h4>Description</h4>
    <div class='innerDiv rounded'>
      <p class='innerDivText mb-0'>Task Description Here</p>
    </div>
  </div>

  <div v-if='task.children.length > 0'>
    <h4>Subtasks</h4>
    <div class='innerDiv rounded'>
      <div v-for='(subTaskObj, key) in getSubTasks' class='subTaskDiv' :key='key'>
        <p class='innerDivText mb-0'>{{ subTaskObj.task }}</p>
      </div>
    </div>
  </div>

  <div v-else>
    <button type='button' class='btn btn-info w-50' @click='toggleTaskCompleted'>
      <p class='mb-0' v-if='!task.taskCompleted'>Complete Task</p>
      <p class='mb-0' v-else>Uncomplete Task</p>
    </button>
  </div>

  <div class='taskOpBar'>
    <img class='opBarIcons' src='../assets/eye-closed.svg' alt='Close' title='Close' @click='closeTask'>
    <img class='opBarIcons' src='../assets/delete.svg' alt='Delete' title='Delete'>
    <img class='opBarIcons' src='../assets/edit.svg' alt='Edit' title='Edit'>
    <img class='opBarIcons' src='../assets/add.svg' alt='Add' title='Add'>
    <!-- <span class='checkBoxDiv rounded' v-if='task.children.length == 0' title='Toggle Check'></span> -->
  </div>
</div>
</template>

<script>
import { toggleTaskCompleted } from '../js/timeframe/timeframeMethods.js';
import { nodeDFS } from '../js/nodeFunctions.js';

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleTaskCompleted,
    closeTask() {
      this.$emit('close-task', null);
    }
  },
  computed: {
    getSubTasks() {
      const tasks = [],
            currentTask = this.task.task;

      nodeDFS(function(node) {
        if(node.task != currentTask) {
          tasks.push(node);
        }
      }, this.task);

      return tasks;
    }
  }
}
</script>

<style scoped>
.viewTaskDiv {
  width: 60%;
  height: 80%;
  position:fixed;
  top: 10%;
  left: 20%;
  z-index:100;
  border: 2px solid black;
  color: white;
}

.checkBoxDiv {
  cursor: pointer;
  height: 24px;
  width: 24px;
  background-color: #bbb;
  border: 2px solid black;
  display: inline-block;
  vertical-align: middle;
}

.taskOpBar {
  border-top: 2px solid black;
  height: 40px;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.opBarIcons {
  cursor: pointer;
  height: 24px;
}

.opBarIcons, .checkBoxDiv {
  margin-left: 7%;
  margin-right: 7%;
}

.innerDiv {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  border: solid black 2px;
}

.innerDivText {
  margin-left: 5px;
}
</style>

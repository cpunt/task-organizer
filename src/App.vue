<template>
  <div id='app'>
    <TaskBar class='taskBar mb-0' v-if='!newtask' @add-new-task='addNewTask' @update-task-selected='updateTaskSelected' :roots='roots' :timeframes='timeframes' :taskselected='taskselected'></TaskBar>

    <div v-if='!newtask' class='headerDiv'>
      <h3 class='header w-25 text-center mb-0 border-left'>Yearly</h3>
      <h3 class='header w-25 text-center mb-0'>Monthly</h3>
      <h3 class='header w-25 text-center mb-0'>Weekly</h3>
      <h3 class='header w-25 text-center mb-0'>Daily</h3>
    </div>

    <div v-if='!newtask' id='timeframesDiv' class='text-center'>
      <TimeframeRoots v-for='(timeframeObj, index) in timeframes' :key='index' :class='{ borderLeft: index == 0 }' :dates='timeframeObj.dates'  :timeframe='timeframeObj.timeframe' :taskselected='taskselected'></TimeframeRoots>
    </div>

    <CreateTasks v-if='newtask' @create-new-task='createNewTask'  @cancel-new-task='cancelNewTask' :tasks='roots'></CreateTasks>

  </div>
</template>

<script>
import CreateTasks from './components/CreateTasks.vue';
import TimeframeRoots from './components/TimeframeRoots.vue';
import TaskBar from './components/TaskBar.vue';

import { Node, nodeDFS, addNode } from './js/nodeFunctions.js';
import { addTaskToTimeframe } from './js/taskDates.js';

export default {
  name: 'App',
  data: function() {
    return {
      taskselected: '',
      newtask: false,
      roots: [],
      timeframes: [
        {
          timeframe: 'yearly',
          dates: []
        },
        {
          timeframe: 'monthly',
          dates: []
        },
        {
          timeframe: 'weekly',
          dates: []
        },
        {
          timeframe: 'daily',
          dates: []
        }
      ]
    }
  },
  methods: {
    addTaskToTimeframe,
    updateTaskSelected(task) {
      this.taskselected = task;
    },
    createNewTask(taskData) {
      let root,
          task,
          newNode;

      if(!taskData.taskParent) {

        for(let i = 0; i < taskData.tasks.length; i++) {
          root = new Node(taskData.tasks[i]);
          this.roots.push(root);
          this.addTaskToTimeframe(root);
        }

      } else {

        for(let i = 0; i < taskData.tasks.length; i++) {
          task = taskData.tasks[i];

          newNode = addNode(taskData.taskRoot, task, taskData.taskParent.task, nodeDFS);

          if(taskData.taskParent.time.timeframe != task.time.timeframe) {
            this.addTaskToTimeframe(newNode);
          }
        }

      }

      this.newtask = false;
    },
    addNewTask() {
      this.newtask = true;
    },
    cancelNewTask() {
      this.newtask = false;
    }
  },
  components: {
    CreateTasks,
    TimeframeRoots,
    TaskBar
  }
}
</script>

<style>
/* input[type=date]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
} */

.header {
  display: inline-block;
  border-right: 1px solid #333;
}

.taskBar {
  border-bottom: 1px solid #333;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  margin-bottom: 10px;
}

.borderLeft {
  border-left: 1px solid #333;
}

#timeframesDiv {
  /* height: 400px; */
  width: 100%;
  height: 93vh;
}
</style>

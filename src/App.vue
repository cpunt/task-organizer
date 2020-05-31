<template>
  <div id='app'>
    <div class='taskBar mb-0' v-if='!newtask'>
      <label class='d-inline'>From:
        <input v-model='dateSelected'
               class='form-control d-inline w-25'
               type='date'
               @change='scrollToDate'
        >
      </label>

      <button class='btn btn-primary d-inline mb-1' @click='addNewTask'>Add Task(s)</button>
    </div>

    <div v-if='!newtask' class='headerDiv'>
      <h3 class='header w-25 text-center mb-0 border-left'>Yearly</h3>
      <h3 class='header w-25 text-center mb-0'>Monthly</h3>
      <h3 class='header w-25 text-center mb-0'>Weekly</h3>
      <h3 class='header w-25 text-center mb-0'>Daily</h3>
    </div>

    <div v-if='!newtask' id='timeFramesDiv' class='text-center'>
      <!-- Maybe loop over object instead of writing out four times -->
      <TimeFrameRoots class='border-left' :tasks='timeFrames.yearly' :dateselected='dateSelected' :timeframe="'yearly'"></TimeFrameRoots>

      <TimeFrameRoots :tasks='timeFrames.monthly' :dateselected='dateSelected' :timeframe="'monthly'"></TimeFrameRoots>

      <TimeFrameRoots :tasks='timeFrames.weekly' :dateselected='dateSelected' :timeframe="'weekly'"></TimeFrameRoots>

      <TimeFrameRoots :tasks='timeFrames.daily' :dateselected='dateSelected' :timeframe="'daily'"></TimeFrameRoots>

    </div>

    <CreateTasks v-if='newtask' @create-new-task='createNewTask'  @cancel-new-task='cancelNewTask' :tasks='goals'></CreateTasks>

  </div>
</template>

<script>
import CreateTasks from './components/CreateTasks.vue';
import TimeFrameRoots from './components/TimeFrameRoots.vue';

import { Node, nodeDFS, addNode } from './js/nodeFunctions.js';
import { currentDate } from './js/sharedFunctions.js';
import { scrollToDate } from './js/scroll.js';


export default {
  name: 'App',
  data: function() {
    return {
      dateSelected: '',
      newtask: false,
      goals: [],
      timeFrames: {
        yearly: [],
        monthly: [],
        weekly: [],
        daily: []
      }
    }
  },
  methods: {
    scrollToDate,
    addNewTask() {
      this.newtask = true;
    },
    cancelNewTask() {
      this.newtask = false;
    },
    createNewTask(taskData) {
      let goal,
          task,
          newNode;

      if(!taskData.taskParent) {

        for(let i = 0; i < taskData.tasks.length; i++) {
          goal = new Node(taskData.tasks[i]);
          this.goals.push(goal);
          this.timeFrames[goal.time.timeFrame].push(goal);
        }

      } else {

        for(let i = 0; i < taskData.tasks.length; i++) {
          task = taskData.tasks[i];

          newNode = addNode(taskData.taskRoot, task, taskData.taskParent.task, nodeDFS);

          if(taskData.taskParent.time.timeFrame != task.time.timeFrame) {
            this.timeFrames[task.time.timeFrame].push(newNode);
          }
        }

      }

      this.newtask = false;
    }
  },
  mounted: function() {
    this.dateSelected = currentDate();
  },
  components: {
    CreateTasks,
    TimeFrameRoots
  }
}
</script>

<style>
input[type=date]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
}

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

.border-left {
  border-left: 1px solid #333;
}

#timeFramesDiv {
  /* height: 400px; */
  width: 100%;
  height: 93vh;
}
</style>

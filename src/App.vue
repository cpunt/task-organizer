<template>
  <div id='app'>
    <div class='taskBar' v-if='!newtask'>
      <label class='d-inline'>From:
        <input v-model='dateSelected'
               class='form-control d-inline w-25'
               type='date'
        >
      </label>

      <button class='btn btn-primary d-inline mb-1' @click='addNewTask'>Add Task</button>
    </div>

    <div v-if='!newtask' id='timeFramesDiv' class='text-center'>
      <!-- Maybe loop over object instead of writing out four times -->

      <TimeFrameRoots class='tasksDiv left-border' :tasks='timeFrames.yearly' :date='dateSelected' :timeframe="'yearly'"></TimeFrameRoots>

      <TimeFrameRoots class='tasksDiv' :tasks='timeFrames.monthly' :date='dateSelected' :timeframe="'monthly'"></TimeFrameRoots>

      <TimeFrameRoots class='tasksDiv' :tasks='timeFrames.weekly' :date='dateSelected' :timeframe="'weekly'"></TimeFrameRoots>

      <TimeFrameRoots class='tasksDiv' :tasks='timeFrames.daily' :date='dateSelected' :timeframe="'daily'"></TimeFrameRoots>
    </div>

    <CreateTasks v-if='newtask' @create-new-task='createNewTask'  @cancel-new-task='cancelNewTask' :tasks='goals'></CreateTasks>

  </div>
</template>

<script>
import CreateTasks from './components/CreateTasks.vue';
import TimeFrameRoots from './components/TimeFrameRoots.vue';

import { Node, nodeDFS, addNode } from './js/nodeFunctions.js';
import { currentDate } from './js/sharedFunctions.js';

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

.taskBar {
  border-bottom: 1px dashed #333;
}

.tasksDiv {
  display: inline-block;
  vertical-align: top;
  width: 24%;
  height: 100%;
  border-right: 1px dashed #333;
}

.left-border {
  border-left: 1px dashed #333;
}

#timeFramesDiv {
  height: 90vh;
  overflow: scroll;
}
</style>

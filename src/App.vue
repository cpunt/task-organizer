<template>
<div id='app'>
  <TaskBar class='taskBar mb-0' v-if='!newtask' @add-new-task='addNewTask' @update-task-selected='updateTaskSelected' :roots='roots' :timeframes='timeframes' :taskselected='taskselected'></TaskBar>

  <div v-if='!newtask' id='timeframesDiv' class='text-center'>
    <TimeframeDivs v-for='(timeframeObj, index) in timeframes'
                   :key='index'
                   :class='{ borderLeft: index == 0 }'
                   :dates='timeframeObj.dates'
                   :timeframe='timeframeObj.timeframe'
                   :taskselected='taskselected'
                   v-on='$listeners'
                   @view-task='updateTask'
                   @delete-task='deleteTask'
    >
   </TimeframeDivs>

   <ViewTask v-if='task != null' :task='task' @close-task='updateTask'></ViewTask>
  </div>

  <CreateTask v-if='newtask' @create-new-task='createNewTask'  @cancel-new-task='cancelNewTask' :tasks='roots'></CreateTask>

</div>
</template>

<script>
import CreateTask from './components/CreateTask.vue';
import TimeframeDivs from './components/TimeframeDivs.vue';
import ViewTask from './components/ViewTask.vue';
import TaskBar from './components/TaskBar.vue';

import { updateTaskSelected, addNewTask, cancelNewTask, createNewTask, addTaskToTimeframe } from './js/app/appMethods.js';
import { removeNode, nodeDFS } from './js/nodeFunctions.js';
import { getDateIndex } from './js/app/appFunctions.js';

export default {
  name: 'App',
  data: function() {
    return {
      taskselected: '',
      newtask: false,
      task: null,
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
    addNewTask,
    cancelNewTask,
    updateTaskSelected,
    createNewTask,
    addTaskToTimeframe,
    updateTask(task) {
      this.task = task;
    },
    deleteTask(task) {
      // Get an arr of tasks what will be shown in timeframes
      let timeframeTasks = [];

      nodeDFS(function(node) {
        if(node.parent == null || node.parent.time.timeframe != node.time.timeframe) {
          timeframeTasks.push(node);
        }
      }, task);

      for(let i = 0; i < timeframeTasks.length; i++) {
        this.deleteTaskFromTimeframe(timeframeTasks[i]);
      }

      // Remove from roots
      if(task.parent == null) {
        for(let i = 0; i < this.roots.length; i++) {
          if(this.roots[i].task == task.task) {
            this.roots.splice(i, 1);
          }
        }
      } else {
        let taskRoot = task.parent;
        while(taskRoot.parent != null) {
          taskRoot = taskRoot.parent;
        }

        removeNode(taskRoot, task.task, nodeDFS);
      }
    },
    deleteTaskFromTimeframe(task) {
      let timeframeIndex;

      for(let i = 0; i < this.timeframes.length; i++) {
        if(this.timeframes[i].timeframe == task.time.timeframe) {
          timeframeIndex = i;
        }
      }

      let datesArr = this.timeframes[timeframeIndex].dates,
          startIndex = getDateIndex(task.time.timeframe, datesArr[0].date, new Date(task.time.startDate)),
          endIndex = getDateIndex(task.time.timeframe, datesArr[0].date, new Date(task.time.endDate)),
          dateTaskArr;

      for(let i = startIndex; i <= endIndex; i++) {
        dateTaskArr = datesArr[i].tasks

        for(let j = 0; j < dateTaskArr.length; j++) {
          if(dateTaskArr[j].task == task.task) {
            dateTaskArr.splice(j, 1);
          }
        }
      }
    }

  },
  components: {
    CreateTask,
    TimeframeDivs,
    ViewTask,
    TaskBar
  }
}
</script>

<style>
input[type=date]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
}

.taskBar {
  margin-bottom: 10px;
}

.borderLeft {
  border-left: 1px solid #333;
}

#timeframesDiv {
  width: 100%;
  height: 93vh;
}
</style>

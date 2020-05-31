<template>
  <div class='tasksDiv'>
    <div v-for='(timeFrameObj, index) in tasksInDates' :key='timeFrameObj.date' class='text-left' :class='{ bottom: index == (tasksInDates.length - 1) }'>
      <h5 class='text-center dateHeader mb-0' :class='timeframe'>{{ timeFrameObj.date }}</h5>
      <div class='mt-1 mb-1' v-for='(task, index) in timeFrameObj.tasks' :key='index'>
        <ul class='list-group'>
          <li>
            <div class='rounded bg-info text-light liDiv'>
              <p class='mb-0'>{{ task.task }}</p>
              <p class='mb-0'>{{ task.time.fromDate }}</p>
              <p class='mb-0'>{{ task.time.toDate }}</p>
              <div class='text-right'>
                <span v-if='displayTaskList(task)' class='caret' :class="{ 'caret-down': showChildren[index] }" @click='toggleChildren(index)'></span>
              </div>
            </div>
            <TimeFrameNodes v-if='displayTaskList(task) && showChildren[index]' :tasks='task.children'></TimeFrameNodes>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TimeFrameNodes from '../components/TimeFrameNodes.vue';
import { taskDate, displayTaskList,  toggleChildren, orderTasksByDate, createShowChildrenArray } from '../js/timeFrameFunctions.js';
import { getTasksInDates } from '../js/taskDates.js';

//Import class instead of individual functions
export default {
  name: 'TimeFrameRoots',
  props: {
    tasks: {
      type: Array,
      required: true
    },
    dateselected: {
      type: String,
      required: true
    },
    timeframe: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      showChildren: []
    }
  },
  methods: {
    taskDate,
    displayTaskList,
    toggleChildren,
    orderTasksByDate,
    createShowChildrenArray,
    getTasksInDates
  },
  computed: {
    tasksInDates() {
      let arr = this.getTasksInDates();

      return arr;
    }
  },
  components: {
    TimeFrameNodes
  },
  mounted: function() {
    this.orderTasksByDate();
    this.createShowChildrenArray();
  }
}
</script>

<style>
ul  {
   list-style:none;
   padding-inline-start: 5px;
}

.liDiv {
  width: 200px;
  margin-left: 5px;
  margin-bottom: 3px;
}

.caret {
  cursor: pointer;
  user-select: none;
}

.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.caret-down::before {
  transform: rotate(90deg);
}

.bottom {
  margin-bottom: 75vh;
}

.dateHeader {
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  margin-top: -2px;
}

.tasksDiv {
  display: inline-block;
  vertical-align: top;
  width: 25%;
  height: 100%;
  border-right: 1px solid #333;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  overflow: scroll;
}

</style>

<template>
  <ul>
    <li v-for='(task, index) in validTasks' :key='index'>
      <div class='rounded bg-info text-light liDiv'>
        <p class='mb-0'>{{ task.task }}</p>
        <p class='mb-0'>{{ task.time.fromDate }}</p>
        <p class='mb-0'>{{ task.time.toDate }}</p>
        <div class='text-right'>
          <span v-if='taskHasValidChildren(timeframe, date, task.children)' class='caret' :class="{ 'caret-down': showChildren[index] }" @click='toggleChildren(index)'></span>
        </div>
      </div>
      <TimeframeNodes v-if='taskHasValidChildren(timeframe, date, task.children) > 0 && showChildren[index]' :tasks='task.children' :date='date' :timeframe='timeframe'></TimeframeNodes>
    </li>
  </ul>
</template>

<script>
import { taskDate, taskHasValidChildren,  toggleChildren, getCurrentDate } from '../js/timeframeFunctions.js';

export default {
  name: 'TimeframeNodes',
  props: {
    tasks: {
      type: Array,
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
      showChildren: [],
      childrenArrays: []
    }
  },
  methods: {
    taskDate,
    taskHasValidChildren,
    toggleChildren,
    createShowChildrenArray() {
      for(let i = 0; i < this.tasks.length; i++) {
        this.showChildren.push(false);
      }
    }
  },
  computed: {
    validTasks() {
      let tasksDateStart = this.date,
          timeframe = this.timeframe,
          fromDate,
          toDate;

      return this.tasks.filter(function(task) {
        if(task.time.timeframe == timeframe) {
          fromDate = getCurrentDate(task.time.timeframe , new Date(task.time.fromDate));
          toDate = getCurrentDate(task.time.timeframe , new Date(task.time.toDate));
          if(fromDate <= tasksDateStart && toDate >= tasksDateStart) {
            // console.log({
            //   'startDate': tasksDateStart,
            //   'fromDate': fromDate,
            //   'toDate': toDate
            // });

            return true;
          }
        }

        return false;
      });
    }
  },
  mounted: function() {
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

</style>

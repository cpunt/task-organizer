<template>
<div class='text-center'>
  <div class='taskDiv card card-body shadow-sm rounded p-0'
    :class="{ highlightTask: task.highlight }"
    @mouseover="highlightTasks('highlight')"
    @mouseleave="highlightTasks('unhighlight')"
  >
    <p class='mb-1 taskHeader'>{{ task.task }}</p>

    <div v-if='task.children.length > 0' class='progressBarDiv text-center mb-1'>
      <p class='pBText my-0'>{{ leavesCompleted }} / {{ leaves }}</p>
      <div class='progress my-0 barDiv progressBar'>
        <div class='progress-bar progressBarPercent' role='progressbar' :style='{ width: `${percent}%` }' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
      </div>
    </div>

    <div class='taskOpBar'>
      <img class='opBarIcons' src='../assets/eye-open.svg' alt='View' title='View' @click="viewTask(taskid); highlightTasks('unhighlight')">
      <img class='opBarIcons' src='../assets/delete.svg' alt='Delete' title='Delete' @click="confirmDeleteTask(taskid); highlightTasks('unhighlight')">
      <img class='opBarIcons' src='../assets/add.svg' alt='Add' title='Add' @click="addTask(taskid); highlightTasks('unhighlight')">
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


<script>
import { completedIndex, taskHasValidChild, leaves, leavesCompleted, percent, expired } from '../js/timeframe/timeframeComputed.js';
import { mapState, mapActions } from 'vuex'

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
  computed: {
    completedIndex,
    taskHasValidChild,
    leaves,
    leavesCompleted,
    percent,
    expired,
    ...mapState('tasks', [
      'tasks'
    ])
  },
  watch: {
    percent (val) {
      this.task.taskCompleted = val == 100;
    }
  },
  methods: {
    ...mapActions('display', [
      'viewTask',
      'addTask',
      'confirmDeleteTask'
    ]),
    updateDateTaskCompleted () {
      this.$store.dispatch('tasks/updateDateTaskCompleted', {
        task: this.task,
        taskId: this.taskid,
        completedIndex: this.completedIndex
      });
    },
    toggleShowChildren () {
      this.showChildren = !this.showChildren;
    },
    highlightTasks (type) {
      const taskIds = this.getTaskIds();

      switch (type) {
        case 'highlight':
          this.$store.dispatch('tasks/highlightTasks', taskIds);
          break;
        case 'unhighlight':
          this.$store.dispatch('tasks/unhighlightTasks', taskIds);
          break;
      }
    },
    getTaskIds () {
      const taskIds = [];
      let id = this.taskid,
          node;
      // Get current task to root task
      while (id) {
        node = this.tasks[id];
        taskIds.push(id);

        id = node.parent;
      }
      // Get children tasks
      let queue = [];
      queue.push(this.tasks[this.taskid]);

      let currentNode = queue.pop(),
          currentId;

      while (currentNode) {
        let length = currentNode.children.length;

        for(let i = 0; i < length; i++) {
          currentId = currentNode.children[i];
          taskIds.push(currentId);
          queue.unshift(this.tasks[currentId]);
        }
        currentNode = queue.pop();
      }

      return taskIds;
    }
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
  /* background-color: #b4ecb4; */
  background-color: #A8E9A8;
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

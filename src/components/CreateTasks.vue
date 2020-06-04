<template>
  <div class='container my-5 card card-body shadow w-75'>
  <h3 class='text-center'>New Task</h3>
    <div class='taskInput'>
      <label class='w-100'>Task Parent:
        <select class='form-control mb-3' v-model='taskPath'>
          <option :value='[]'></option>
          <option v-for='(task, index) in taskPaths()' :value='task' :key='index'>{{ task.join('/') }}</option>
        </select>
      </label>
    </div>

    <TaskInputs v-for='(task, index) in newTasks' :key='index' :task='task' :taskPath='taskPath'></TaskInputs>

    <div class='text-center'>
      <button class='btn btn-primary mx-1' @click='cancelTask'>Cancel</button>
      <button class='btn btn-primary mx-1' @click='addTask'>Add Task</button>
      <button class='btn btn-primary mx-1' @click='createTask'>Create Task(s)</button>
    </div>

  </div>
</template>


<script>
import TaskInputs from '../components/TaskInputs.vue';

import { nodeDFS, containsNode } from '../js/nodeFunctions.js';
import { currentDate } from '../js/sharedFunctions.js';

export default {
  name: 'CreateTasks',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      taskPath: [],
      newTasks: []
    }
  },
  methods: {
    currentDate,
    cancelTask() {
      this.$emit('cancel-new-task');
    },
    addTask() {
      const task = {
        task: null,
        time: {
          timeframe: null,
          fromDate: this.currentDate(),
          toDate: this.currentDate()
        }
      }
      this.newTasks.push(task);
    },
    createTask() {
      //Check if input valid
      const root = this.getRoot();
      const parent = this.getParent(root);

      this.root = root;
      this.parent = parent;

      const taskData = {
        taskRoot: root,
        taskParent: parent,
        tasks: this.newTasks
      }

      this.$emit('create-new-task', taskData);
    },
    getRoot() {
      if(this.taskPath.length == 0) {
        return null;
      }

      let root;

      for(let i = 0; i < this.tasks.length; i++) {
        if(this.tasks[i].task == this.taskPath[0]) {
          root = this.tasks[i];
          break;
        }
      }

      return root;
    },
    getParent(root) {
      if(this.taskPath.length == 0) {
        return null;
      }
      let parentTask = this.taskPath[this.taskPath.length - 1],
          parent;

      containsNode(function(node) {
        if(node.task == parentTask) {
          parent = node;
        }
      }, root, nodeDFS);

      return parent;
    },
    taskPaths() {
      let pathsList = [],
          path,
          root;

      for(let i = 0; i < this.tasks.length; i++) {
        root = this.tasks[i];

        nodeDFS(function(node) {
          path = [];

          while(node.parent) {
            path.unshift(node.task);
            node = node.parent;
          }

          path.unshift(node.task);

          pathsList.push(path);
        }, root);
      }

      return pathsList;
    }
  },
  beforeMount(){
    window.scrollTo(0,0);
    this.addTask();
  },
  components: {
    TaskInputs
  }
}
</script>

<style scoped>

</style>

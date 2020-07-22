<template>
<div class='deleteTaskDiv card card-body shadow'>
  <img class='float-left icon' src='../assets/close-cross.svg' alt='Close' title='Close' @click='cancel'>
  <div class='deleteDiv'>
    <h3>Are you sure you want to delete: <h3>{{ tasks[taskId].task }}?</h3></h3>

    <div class='text-center btnDiv'>
      <button type='button' class='btn btn-primary d-inline mx-3' @click='cancel'>Cancel</button>
      <button type='button' class='btn btn-primary d-inline mx-3' @click='deleteTask'>Delete</button>
    </div>
  </div>
</div>
</template>

<script>
import { cancel, cancelByEsc } from '../js/sharedMethods.js';
import { mapState } from 'vuex'

export default {
  name: 'DeleteTask',
  methods: {
    cancel,
    cancelByEsc,
    deleteTask() {
      this.$store.dispatch('tasks/deleteTask', this.taskId);
      this.cancel();
    }
  },
  computed: {
    ...mapState([
      'taskId',
      'display'
    ]),
    ...mapState('tasks', [
      'tasks'
    ])
  },
  mounted() {
    document.addEventListener('keyup', this.cancelByEsc);
  }
}
</script>

<style scoped>
.deleteTaskDiv {
  position: absolute;
  width: 60%;
  z-index:100;
  top: 4%;
  left: 20%;
  height: 210px;
}

.deleteDiv {
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  height: 168px;
  position: relative;
}

.btnDiv {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.icon {
  cursor: pointer;
  height: 24px;
  position: absolute;
}
</style>

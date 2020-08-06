<template>
<div class='deleteTaskDiv card card-body shadow'>
  <img class='icon' src='../assets/close-cross.svg' alt='Close' title='Close' @click='cancel'>
  <div class='deleteDiv'>
    <h3 class='ml-3'>Are you sure you want to delete task:<br>{{ tasks[taskId].task }}?</h3>

    <div class='text-center mt-5'>
      <button type='button' class='btn btn-primary d-inline mx-3' @click='cancel'>Cancel</button>
      <button type='button' class='btn btn-primary d-inline mx-3' @click='deleteTask'>Delete</button>
    </div>
  </div>
</div>
</template>

<script>
import { cancelByEsc } from '../js/sharedMethods.js';
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DeleteTask',
  methods: {
    ...mapActions('display', [
      'cancel'
    ]),
    cancelByEsc,
    deleteTask() {
      this.$store.dispatch('tasks/deleteTask', this.taskId);
      this.cancel();
    }
  },
  computed: {
    ...mapState('tasks', [
      'tasks'
    ]),
    ...mapState('display', [
      'taskId'
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
}

.deleteDiv {
  width: 92%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  color: #37474F;
}

.icon {
  cursor: pointer;
  height: 24px;
  width: 24px;
  position: absolute;
}
</style>

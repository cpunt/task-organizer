<template>
<div class='deleteTaskDiv card card-body shadow'>
  <div class='deleteDiv'>
    <h3>Are you sure you want to delete: <h3>{{ task.task }}?</h3></h3>

    <div class='text-center btnDiv'>
      <button type='button' class='btn btn-primary d-inline mx-3' @click='cancel'>Cancel</button>
      <button type='button' class='btn btn-primary d-inline mx-3' @click='deleteTask'>Delete</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'DeleteTask',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    deleteTask() {
      this.$emit('delete-task', this.task);
    },
    cancelByEsc(e) {
      if(e.keyCode == '27') {
        document.removeEventListener('keyup', this.cancelByEsc);
        this.cancel()
      }
    }
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
</style>

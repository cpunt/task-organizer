Vue.component('editgoal', {
  props: {
    objective: {
      type: Object,
      required: true
    }
  },
  template: `
  <div>
    <div class='mb-3'>
      <input v-model='objective.goal' class='goalInput form-control w-75 d-inline' type='text' placeholder='Enter Goal' required>
      <p class='link mb-0 d-inline float-right' @click='finishEditing'>Update</p>
    </div>

    <div>
      <h3 class='ml-1'>Uncompleted Tasks</h3>
      <div v-for='(task, taskIndex) in objective.uncompletedTasks' class='input-group w-75 taskDiv mb-4'>
        <input v-model='objective.uncompletedTasks[taskIndex]' class='taskInput form-control' type='text' placeholder='Enter Task'>
        <button type='button' class='cross close' aria-label='Close' @click='deleteUncompletedTask(taskIndex)'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    </div>

    <div v-if='objective.completedTasks.length > 0'>
      <h3>Completed Tasks</h3>
      <div v-for='(task, taskIndex) in objective.completedTasks' class='input-group w-75'>
        <input v-model='objective.completedTasks[taskIndex]' class='taskInput form-control mb-4' type='text' placeholder='Enter Task'>
        <button type='button' class='cross close mb-4' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    </div>

    <div class='text-center'>
      <button class='btn btn-primary' @click='addTask'>Add Task</button>
    </div>
  </div>
  `,
  methods: {
    addTask() {
      this.objective.uncompletedTasks.push(null);
    },
    deleteUncompletedTask(taskIndex) {
      this.objective.uncompletedTasks.splice(taskIndex, 1);
    },
    finishEditing() {
      //Check here for null inputs
      if(this.validEdit()) {
        this.objective.edit = false;
      } else {
        //Display errors
        //Add errors object to data
      }
    },
    validEdit() {
      let valid = true;

      if(this.objective.goal == null) {
        valid = false;
      }

      return valid;
    }
  }
});

// <p class='link mb-0 d-inline float-right mr-3' @click='addTask'>Add Task</p>

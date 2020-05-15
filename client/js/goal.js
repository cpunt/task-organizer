Vue.component('goal', {
  props: {
    objective: {
      type: Object,
      required: true
    }
  },
  template: `
  <div>
      <div class='mb-3'>
        <p class='link mb-0 d-inline float-right' @click='edit'>Edit</p>
        <h2 class='d-inline'>{{ objective.goal }}</h2>
      </div>


      <progressbar :objective='objective'></progressbar>

      <p v-if='!tasksDisplayed' class='link text-center' @click='viewTasks'>Show Tasks</p>

      <div v-else>
        <p class='link text-center' @click='viewTasks'>Hide Tasks</p>
        <viewtasks :objective='objective'></viewtasks>
      </div>
  </div>
  `,
  data() {
    return {
      tasksDisplayed: false
    };
  },
  methods: {
    edit() {
      this.objective.edit = true;
    },
    viewTasks() {
      this.tasksDisplayed = !this.tasksDisplayed;
    }
  }
});

// <p class='link mb-0 d-inline float-right mr-3' @click='viewTasks'>View Tasks</p>

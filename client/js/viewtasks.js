Vue.component('viewtasks', {
  props: {
    objective: {
      type: Object,
      required: true
    }
  },
  template: `
  <div>
    <div v-if='objective.uncompletedTasks.length > 0'>
      <h3 class='mb-2'>Uncompleted Tasks</h3>

      <div class='mb-2 taskDiv w-75' v-for='(task, index) in objective.uncompletedTasks'>
        <h4 class='d-inline'>{{ task }}</h4>
        <div class='d-inline'>
          <span class='circle float-right border rounded-circle border-primary' @click='check(index)'></span>
        </div>
      </div>
    </div>

    <div v-if='objective.completedTasks.length > 0'>
      <h3 class='mb-2'>Completed Tasks</h3>

      <div class='mb-2 taskDiv w-75' v-for='(task, index) in objective.completedTasks'>
        <h4 class='d-inline'>{{ task }}</h4>
        <div class='d-inline'>
          <span class='circle float-right border rounded-circle checked' @click='uncheck(index)'></span>
        </div>
      </div>
    </div>
  </div>
  `,
  methods: {
    check(index) {
      this.objective.completedTasks.push(this.objective.uncompletedTasks[index]);
      this.objective.uncompletedTasks.splice(index, 1);
    },
    uncheck(index) {
      this.objective.uncompletedTasks.push(this.objective.completedTasks[index]);
      this.objective.completedTasks.splice(index, 1);
    }
  }
});

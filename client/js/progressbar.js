Vue.component('progressbar', {
  props: {
    objective: {
      type: Object,
      required: true
    }
  },
  template: `
  <div>
    <div class='progress' style='height: 30px;'>
      <div class='progress-bar' :style='{ width: progressPercent }' role='progressbar' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'>{{ progressPercent }}</div>
    </div>

    <p class='text-center my-1'>{{ objective.completedTasks.length }}/{{ totalTasks }} tasks complete</p>
  </div>
  `,
  computed: {
    progressPercent() {
      return `${((this.objective.completedTasks.length / this.totalTasks) * 100).toFixed(2)}%`;
    },
    totalTasks() {
      return this.objective.completedTasks.length + this.objective.uncompletedTasks.length
    }
  }
});

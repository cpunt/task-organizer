Vue.component('goals', {
  props: {
    objectives: {
      type: Array,
      required: true
    }
  },
  template: `
  <div>
    <div id='goalsDiv'>
      <div v-for='(objective, index) in objectives' class='goalDiv container card card-body shadow mb-3'>
        <editgoal v-if='objective.edit' :objective='objective'></editgoal>

        <goal v-else :objective='objective'></goal>
      </div>
    </div>


    <div class='text-center mt-3'>
      <button type='button' class='btn btn-primary w-25' @click='addGoal'>Add Goal</button>
    </div>
  </div>
  `,
  methods: {
    addGoal() {
      const objective = {
        goal: null,
        uncompletedTasks: [null],
        completedTasks: [],
        edit: true
      }

      this.objectives.push(objective);
    }
  }
});

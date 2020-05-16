let app = new Vue({
  el: '#app',
  data: {
    timeFrames: ['daily', 'weekly', 'monthly', 'yearly'],
    timeFrameSelected: 0,
    type: 'Programming',
    objectives: {
      daily: [],
      weekly: [],
      monthly: [],
      yearly: []
    }
  },
  methods: {
    date() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
    nextTimeFrame() {
      if(this.timeFrameSelected >= this.timeFrames.length - 1) {
        this.timeFrameSelected = 0;
      } else {
        this.timeFrameSelected++;
      }
    },
    previousTimeFrame() {
      if(this.timeFrameSelected == 0) {
        this.timeFrameSelected = this.timeFrames.length - 1;
      } else {
        this.timeFrameSelected--;
      }
    }
  },
  computed: {
    title() {
      return `${this.timeFrame} Goals- ${this.type}`.toLowerCase();
    },
    timeFrame() {
      return this.timeFrames[this.timeFrameSelected];
    },
    timeFrameObjectives() {
      return this.objectives[this.timeFrame];
    }
  }
});

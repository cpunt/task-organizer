// import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    timeframes: {
      yearly: [],
      monthly: [],
      weekly: [],
      daily: []
    }
  },
  mutations: {
    ADD_TASK(state, { taskId, timeframe }) {
      state.timeframes[timeframe].push(taskId);
    },
    DELETE_TASK(state, { taskId, timeframe }) {
      const index = state.timeframes[timeframe].indexOf(taskId);
      state.timeframes[timeframe].splice(index, 1);
    }
  },
  actions: {
    setTimeframes({ rootState, state, commit }) {
      const tasks = rootState.tasks.tasks;
      let task, taskParentTimeframe, taskTimeframe;

      for(const taskId in tasks) {
        task = tasks[taskId];
        taskParentTimeframe = task.parent ? tasks[task.parent].time.timeframe : '';
        taskTimeframe = task.time.timeframe

        if(!taskParentTimeframe || taskParentTimeframe != taskTimeframe) {
          if(!state.timeframes[taskTimeframe].includes(taskId)) {
            commit('ADD_TASK', { taskId: taskId, timeframe: taskTimeframe });
          }
        }
      }
    }
  },
  getters: {

  }
}

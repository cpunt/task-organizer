
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
    ADD_TASK (state, { taskId, timeframe }) {
      state.timeframes[timeframe].push(taskId);
    },
    DELETE_TASK (state, { taskId, timeframe }) {
      const index = state.timeframes[timeframe].indexOf(taskId);
      state.timeframes[timeframe].splice(index, 1);
    }
  },
  actions: {
    setTimeframes ({ rootState, state, commit, dispatch }, timeframe) {
      const oldTasks = state.timeframes[timeframe];
      const newTasks = [];
      const tasks = rootState.tasks.tasks;
      let parentTimeframe, task;

      for (const taskId in tasks) {
        task = tasks[taskId];
        if (task.time.timeframe !== timeframe) {
          continue;
        }

        parentTimeframe = task.parent ? tasks[task.parent].time.timeframe : '';
        if (parentTimeframe !== task.time.timeframe) {
          newTasks.push(taskId);
        }
      }

      const added = newTasks.filter(taskId => !oldTasks.includes(taskId));
      const deleted = oldTasks.filter(taskId => !newTasks.includes(taskId));

      added.forEach(taskId => commit('ADD_TASK', { taskId: taskId, timeframe: timeframe }));
      deleted.forEach(taskId => commit('DELETE_TASK', { taskId: taskId, timeframe: timeframe }));

      commit('dates/UNSET_DATES', timeframe, { root: true });
      dispatch('dates/setDates', {
        taskIds: state.timeframes[timeframe],
        tasks: rootState.tasks.tasks,
        timeframe: timeframe
      }, { root: true });
    }
  },
  getters: {

  }
}

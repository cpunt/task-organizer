
export default {
  namespaced: true,
  state: {
    taskId: '',
    vtask: false,
    ntask: false,
    dtask: false,
    bgScreen: false
  },
  mutations: {
    SET_TASKID(state, taskId) {
      state.taskId = taskId;
    },
    SET_VTASK(state, vtask ) {
      state.vtask = vtask;
    },
    SET_NTASK(state, ntask) {
      state.ntask = ntask;
    },
    SET_DTASK(state, dtask) {
      state.dtask = dtask;
    },
    SET_BGSCREEN(state, bgScreen) {
      state.bgScreen = bgScreen;
    }
  },
  actions: {
    cancel({ commit }) {
      commit('SET_TASKID', '');
      commit('SET_VTASK', false);
      commit('SET_NTASK', false);
      commit('SET_DTASK', false);
      commit('SET_BGSCREEN', false);
    },
    addTask({ commit }, taskId) {
      commit('SET_TASKID', taskId);
      commit('SET_VTASK', false);
      commit('SET_NTASK', true);
      commit('SET_DTASK', false);
      commit('SET_BGSCREEN', true);
    },
    confirmDeleteTask({ commit }, taskId) {
      commit('SET_TASKID', taskId);
      commit('SET_VTASK', false);
      commit('SET_DTASK', true);
      commit('SET_BGSCREEN', true);
    },
    viewTask({ commit }, taskId) {
      commit('SET_TASKID', taskId);
      commit('SET_VTASK', true);
      commit('SET_BGSCREEN', true);
    }
  }
}

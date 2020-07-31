import { currentDate } from '../../js/sharedFunctions.js';

export default {
  namespaced: true,
  state: {
    taskSelected: '',
    dateSelected: '',
    sidebarActive: false
  },
  mutations: {
    SET_TASK_SELECTED(state, taskSelected) {
      state.taskSelected = taskSelected;
    },
    SET_DATE_SELECTED(state, dateSelected) {
      state.dateSelected = dateSelected;
    },
    SET_SIDEBAR_ACTIVE(state, sidebarActive) {
      state.sidebarActive = sidebarActive;
    }
  },
  actions: {
    trackSidebar({ rootState, commit }) {
      rootState.db.collection('users')
        .doc(rootState.user.email)
        .onSnapshot(querySnapshot => {
          const taskSelected = querySnapshot.data().taskSelected || '' ;
          commit('SET_TASK_SELECTED', taskSelected);
        });
    },
    updateTaskSelected({ rootState }, event) {
      const taskSelected = event.target.value;

      rootState.db.collection('users')
        .doc(rootState.user.email)
        .update({
          taskSelected: taskSelected
        });
    },
    updateDateSelected({ commit }, event) {
      const dateSelected = event ? event.target.value : currentDate();
      commit('SET_DATE_SELECTED', dateSelected);
    }
  }
}

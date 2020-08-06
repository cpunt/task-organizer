import { currentDate } from '../../js/sharedFunctions.js';
import { getDateIndex } from '../../js/app/appFunctions.js';

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
    updateDateSelected({ rootState, state, commit, dispatch }, event) {
      const dateSelected = event ? event.target.value : currentDate();
      commit('SET_DATE_SELECTED', dateSelected);

      const timeframes = ['yearly', 'monthly', 'weekly', 'daily'];
      timeframes.forEach(timeframe => {
        const dates = rootState.dates.dates[timeframe];

        if (dates.length > 0) {
          const dateIndex = getDateIndex(timeframe, dates[0].date, new Date(state.dateSelected));

          dispatch('dates/setDatesRange', {
            timeframe: timeframe,
            index: dateIndex
          }, { root: true });
        }
      });
    }
  }
}

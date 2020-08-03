import Vue from 'vue';
import { getDateIndex } from '../../js/app/appFunctions.js';
import { getTaskDates } from '../../js/timeframe/timeframeFunctions.js';

export default {
  namespaced: true,
  state: {
    dates: {
      yearly: [],
      monthly: [],
      weekly: [],
      daily: []
    },
    datesRange: {
      yearly: {
        index: 0,
        range: 0,
        n: 0,
        max: 0,
        scroll: false
      },
      monthly: {
        index: 0,
        range: 0,
        n: 0,
        max: 0,
        scroll: false
      },
      weekly: {
        index: 0,
        range: 0,
        n: 0,
        max: 0,
        scroll: false
      },
      daily: {
        index: 0,
        range: 0,
        n: 0,
        max: 0,
        scroll: false
      }
    }
  },
  mutations: {
    SET_DATES(state, { dates, timeframe }) {
      Vue.set(state.dates, timeframe, dates);
    },
    UNSET_DATES(state, timeframe) {
      Vue.set(state.dates, timeframe, []);
      Vue.set(state.datesRange, timeframe, {
        index: 0,
        range: 0,
        n: 0,
        max: 0,
        scroll: false
      });
    },
    SET_DATES_RANGE(state, { timeframe, index, range, n, max, scroll }) {
      Vue.set(state.datesRange, timeframe, {
        index: index,
        range: range,
        n: n,
        max: max,
        scroll: scroll
      });
    },
    SET_DATES_RANGE_INDEX(state, { timeframe, index }) {
      Vue.set(state.datesRange[timeframe], 'index', index);
    }
  },
  actions: {
    setDates({ commit, dispatch }, { taskIds, tasks, timeframe }) {
      console.log('I reset the dates');
      if(taskIds.length == 0) {
        return [];
      }
      const datesArr = getTaskDates(taskIds, tasks, timeframe);
      let task, startDateIndex, endDateIndex;

      taskIds.forEach(taskId => {
        task = tasks[taskId];
        startDateIndex = getDateIndex(timeframe, datesArr[0].date, new Date(task.time.startDate));
        endDateIndex = getDateIndex(timeframe, datesArr[0].date, new Date(task.time.endDate));

        for(let j = startDateIndex; j <= endDateIndex; j++) {
          if(datesArr[j]) {
            datesArr[j].tasks.push(taskId);
          }
        }
      });

      commit('SET_DATES', { dates: datesArr, timeframe: timeframe });
      dispatch('setDatesRange', timeframe);
    },
    setDatesRange ({ state, commit }, timeframe) {
      const dates = state.dates[timeframe];
      let max = 0,
          scroll = false,
          n = 10,
          index = 0,
          range = 25,
          counter = 0;


      for (let i = dates.length - 1; i >= 0; i--) {
        if (dates[i].tasks.length > 0) {
          counter++;
        }

        if (counter === range) {
          max = i;
          counter = 0;

          if (i > 0) {
            scroll = true;
          }
          break;
        }
      }

      commit('SET_DATES_RANGE', {
        timeframe: timeframe,
        index: index,
        range: range,
        n: n,
        max: max,
        scroll: scroll
      });
    }
  }
}

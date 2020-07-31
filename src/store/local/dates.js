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
        start: 0,
        stop: 0
      },
      monthly: {
        start: 0,
        stop: 0
      },
      weekly: {
        start: 0,
        stop: 0
      },
      daily: {
        start: 0,
        stop: 0
      }
    }
  },
  mutations: {
    SET_TIMEFRAME_DATES(state, { dates, timeframe }) {
      Vue.set(state.dates, timeframe, dates);
    },
    UNSET_TIMEFRAME_DATES(state, timeframe) {
      Vue.set(state.dates, timeframe, []);
      Vue.set(state.datesRange, timeframe, {
        start: 0,
        stop: 0
      });
    },
    SET_TIMEFRAME_DATES_RANGE(state, { timeframe, start, stop }) {
      Vue.set(state.datesRange, timeframe, {
        start: start,
        stop: stop
      });
    }
  },
  actions: {
    setTimeframeDates({ commit }, { taskIds, tasks, timeframe }) {
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

      commit('SET_TIMEFRAME_DATES', { dates: datesArr, timeframe: timeframe });
      commit('SET_TIMEFRAME_DATES_RANGE', { timeframe: timeframe, start: 0, stop: datesArr.length > 25 ? 25 : datesArr.length });
    }
    // setTimeframeDatesRange({ state }, { timeframe, dateSelected }) {
    //   const dateSelectedIndex = getDateIndex(timeframe, state.dates[timeframe][0].date,  new Date(dateSelected))
    //   console.log(dateSelectedIndex);
    // }
  },
  getters: {
    getTimeframeDates: state => timeframe => {
      return state.dates[timeframe];
    }
  }
}

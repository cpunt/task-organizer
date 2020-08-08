import Vue from 'vue';
import { getTaskDates, displayTask } from '../../js/timeframe/timeframeFunctions.js';
import { getDateIndex, setWeeklyDate } from '../../js/sharedFunctions.js';

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
      yearly: {},
      monthly: {},
      weekly: {},
      daily: {}
    }
  },
  mutations: {
    SET_DATES (state, { dates, timeframe }) {
      Vue.set(state.dates, timeframe, dates);
    },
    UNSET_DATES (state, timeframe) {
      // Maybe get rid of
      Vue.set(state.dates, timeframe, []);
      Vue.set(state.datesRange, timeframe, {
        range: 0,
        n: 0,
        start: 0,
        end: 0
      });
    },
    SET_DATES_RANGE (state, { timeframe, datesRange }) {
      Vue.set(state.datesRange, timeframe, datesRange);
    }
  },
  actions: {
    setDates ({ rootState, commit, dispatch }, { taskIds, tasks, timeframe }) {
      if (taskIds.length == 0) {
        return [];
      }

      const taskSelectedId = rootState.sidebar.taskSelected;

      if (taskSelectedId.length > 0) {
        taskIds = taskIds.filter(taskId => displayTask(taskSelectedId, tasks, taskId));
      }

      const datesArr = getTaskDates(taskIds, tasks, timeframe);
      let task, startDate, endDate, startDateIndex, endDateIndex;

      taskIds.forEach(taskId => {
        task = tasks[taskId];
        startDate = new Date(task.time.startDate);
        endDate = new Date(task.time.endDate);

        if(task.time.timeframe == 'weekly') {
          startDate = setWeeklyDate(startDate);
          endDate = setWeeklyDate(endDate);
        }

        startDateIndex = getDateIndex(timeframe, datesArr[0].date, startDate);
        endDateIndex = getDateIndex(timeframe, datesArr[0].date, endDate);

        for (let j = startDateIndex; j <= endDateIndex; j++) {
          if (datesArr[j]) {
            datesArr[j].tasks.push(taskId);
          }
        }
      });

      commit('SET_DATES', { dates: datesArr, timeframe: timeframe });

      const index = getDateIndex(timeframe, datesArr[0].date, new Date(rootState.sidebar.dateSelected));
      dispatch('setDatesRange', {
        timeframe: timeframe,
        index: index
      });
    },
    setDatesRange ({ state, commit }, { timeframe, index }) {
      const dates = state.dates[timeframe];
      index = index < 0 ? 0 : index > dates.length - 1 ? dates.length - 1 : index;

      let datesRange = {
        start: index,
        end: index,
        scroll: false
      };
      let leftCounter = 10,
          rightCounter = 10;

      const decrement = () => {
        for (let i = datesRange.start; i >= 0; i--) {
          if (dates[i].tasks.length > 0) {
            leftCounter--;
          }

          if (leftCounter === 0 || i === 0) {
            datesRange.start = i;
            break;
          }
        }
      }

      const increment = () => {
        for (let i = datesRange.end; i < dates.length; i++) {
          if (dates[i].tasks.length > 0) {
            rightCounter--;
          }

          if (rightCounter === 0 || i === dates.length - 1) {
            datesRange.end = i;
            break;
          }
        }
      };

      increment();
      decrement();

      if (leftCounter > 0 && rightCounter === 0) {
        rightCounter = leftCounter;
        increment();
      } else if (rightCounter > 0 && leftCounter === 0) {
        leftCounter = rightCounter;
        decrement();
      }

      commit('SET_DATES_RANGE', {
        timeframe: timeframe,
        datesRange: datesRange
      });
    }
  }
}

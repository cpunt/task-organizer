import Vue from 'vue';
import Vuex from 'vuex';
import { firebase, db } from '../js/server/config.js';

import tasks from './remote/tasks.js';
import sidebar from './remote/sidebar.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tasks,
    sidebar
  },
  state: {
    db: db,
    taskId: '',
    user: null,
    display: {
      vtask: false,
      ntask: false,
      dtask: false,
      bgScreen: false
    }
  },
  mutations: {
    SET_USER(state, { email, username }) {
      // Maybe change to set
      if(email && username) {
        state['user'] = {};
        state['user']['email'] = email;
        state['user']['username'] = username;
      } else {
        state['user'] = null
      }
    },
    SET_DISPLAY(state, { vtask, ntask, dtask, bgScreen }) {
      if(vtask != undefined) {
        Vue.set(state['display'], 'vtask', vtask);
      }

      if(ntask != undefined) {
        Vue.set(state['display'], 'ntask', ntask);
      }

      if(dtask != undefined) {
        Vue.set(state['display'], 'dtask', dtask);
      }

      if(bgScreen != undefined) {
        Vue.set(state['display'], 'bgScreen', bgScreen);
      }
    },
    SET_TASKID(state, { taskId }) {
      state['taskId'] = taskId;
    }
  },
  actions: {
    userStatus({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          commit('SET_USER', { email: user.email, username: user.displayName });
          dispatch('tasks/trackTasks');
          dispatch('sidebar/trackSidebar');
        } else {
          commit('SET_USER', { email: null, username: null });
        }
      });
    }
  }
});

export { store };

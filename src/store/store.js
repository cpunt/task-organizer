import Vue from 'vue';
import Vuex from 'vuex';
import { firebase, db } from '../js/server/config.js';

import tasks from './remote/tasks.js';
import sidebar from './remote/sidebar.js';
import display from './remote/display.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tasks,
    sidebar,
    display
  },
  state: {
    db: db,
    user: null
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

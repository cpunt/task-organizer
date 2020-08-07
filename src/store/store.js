import Vue from 'vue';
import Vuex from 'vuex';
import { firebase, db } from '../js/server/config.js';

import tasks from './remote/tasks.js';
import sidebar from './remote/sidebar.js';

import display from './local/display.js';
import timeframes from './local/timeframes.js';
import dates from './local/dates.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tasks,
    sidebar,
    display,
    timeframes,
    dates
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
        commit('display/SET_BGSCREEN', false);
        if(user) {
          commit('SET_USER', { email: user.email, username: user.displayName });
          dispatch('sidebar/trackSidebar');
          dispatch('tasks/trackTasks');
        } else {
          commit('SET_USER', { email: null, username: null });
        }
      });
    },
    signIn({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      commit('display/SET_BGSCREEN', true);

      firebase.auth().signInWithPopup(provider).then(result => {
        console.log(result);
      }).catch(function(error) {
        console.log(error);
      });
    },
    signOut() {
      firebase.auth().signOut().then(() => {
        location.reload();
        console.log('User signed out');
      }).catch(function(error) {
        console.log(error);
      });
    }
  }
});

export { store };

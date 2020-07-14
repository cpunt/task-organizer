import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    roots: [],
    tasks: {},
    taskId: '',
    user: null,
    sidebar: {
      taskSelected: '',
      dateSelected: '',
      sidebarActive: false
    },
    display: {
      vtask: false,
      ntask: false,
      dtask: false,
      bgScreen: false
    }
  },
  mutations: {
    SET_ROOT(state, { id }) {
      if(!state['roots'].includes(id)) {
        state['roots'].push(id);
      }
    },
    SET_TASK(state, { id, task }) {
      Vue.set(state['tasks'], id, task);
    },
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
    SET_SIDEBAR(state, { taskSelected, dateSelected, sidebarActive }) {
      if(taskSelected != undefined) {
        Vue.set(state['sidebar'], 'taskSelected', taskSelected);
      }

      if(dateSelected != undefined) {
        Vue.set(state['sidebar'], 'dateSelected', dateSelected);
      }

      if(sidebarActive != undefined) {
        Vue.set(state['sidebar'], 'sidebarActive', sidebarActive);
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
    },
    DELETE_TASK(state, { id }) {
      Vue.delete(state['tasks'], id);
    }
  }
});

export { store };

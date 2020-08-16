import Vuex from 'vuex';
import Vue from 'vue';
import { mount } from '@vue/test-utils';

import Sidebar from '@/components/Sidebar.vue';
import tasks from '@/store/remote/tasks';
import sidebar from '@/store/remote/sidebar';

Vue.use(Vuex);

describe('Sidebar.vue', () => {
  let wrapper, store, actions, displayActions;

  beforeEach(() => {
    actions = {
      logout: jest.fn()
    }

    displayActions = {
      addTask: jest.fn(),
      login: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        tasks,
        sidebar,
        dates: {
          namespaced: true,
          actions: {
            setDatesRange: jest.fn()
          },
          state: {
            dates: {
              yearly: [],
              monthly: [],
              weekly: [],
              daily: []
            }
          }
        },
        display: {
          namespaced: true,
          actions: displayActions
        }
      },
      state: {
        user: {
          email: 'test@test.com',
          username: 'test'
        }
      },
      actions
    });
    wrapper = mount(Sidebar, { store });
    wrapper.vm.toggleSideBar(true);
  });

  test('Render sidebar', () => {
    expect(wrapper.exists())
      .toBeTruthy();
  });

  test('Close sidebar works', () => {
    wrapper.vm.toggleSideBar(false);
    expect(wrapper.vm.sidebarActive)
      .toBeFalsy();
  });

  test('Login is invoked on click', async () => {
    store.state.user = null;

    await wrapper.vm.$nextTick();

    const loginDiv = wrapper.findAll('.hoverDiv').at(0);
    loginDiv.trigger('click');
    expect(displayActions.login)
      .toBeCalled();
  });

  test('Logout is invoked on click', () => {
    const logoutDiv = wrapper.findAll('.hoverDiv').at(0);
    logoutDiv.trigger('click');
    expect(actions.logout)
      .toBeCalled();
  });

  test('Add task is invoked on click', () => {
    const addTaskDiv = wrapper.findAll('.hoverDiv').at(1);
    addTaskDiv.trigger('click');
    expect(displayActions.addTask)
      .toBeCalled();
  });

  test('From date drop down works', () => {
    const fromDateDiv = wrapper.findAll('.hoverDiv').at(2);
    fromDateDiv.trigger('click');
    expect(wrapper.vm.sidebarDisplay.fromDate)
      .toBeTruthy();
  });

  test('Select task drop down works', () => {
    const selectTaskDiv = wrapper.findAll('.hoverDiv').at(3);
    selectTaskDiv.trigger('click');
    expect(wrapper.vm.sidebarDisplay.selectTask)
      .toBeTruthy();
  });

  /*
  ToDo
    Test updateDateSelected
    Test updateTaskSelected
  */
});

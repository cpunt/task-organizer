import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Task from '@/components/Task.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Task.vue', () => {
  let wrapper, store, propsData, tasks, displayActions;
  const date = new Date(2020, 8, 10);;

  beforeEach(() => {
    displayActions = {
      viewTask: jest.fn(),
      addTask: jest.fn(),
      confirmDeleteTask: jest.fn()
    };

    tasks = {
      '1bgFDzxn2me10pcNe1ee': {
        task: 'Test task',
        time: {
          timeframe: 'yearly',
          endDate: '2025-01-01',
          startDate: '2020-01-01',
        },
        description: '',
        parent: '',
        children: [],
        dateTaskCompleted: {},
        taskCompleted: false
      }
    };

    propsData = {
      taskid: '1bgFDzxn2me10pcNe1ee',
      task: tasks['1bgFDzxn2me10pcNe1ee'],
      date: date,
      timeframe: 'yearly'
    };

    store = new Vuex.Store({
      modules: {
        tasks: {
          namespaced: true,
          state: {
            tasks: tasks
          },
          actions: {
            unhighlightTasks: jest.fn()
          }
        },
        display: {
          namespaced: true,
          actions: displayActions
        }
      }
    });

    wrapper = shallowMount(Task, {
      store,
      localVue,
      propsData
     });
  });

  test('Task renders', () => {
    expect(wrapper.exists())
      .toBeTruthy();
  });

  test('Task name displayed', () => {
    const taskHeader = wrapper.findAll('.taskHeader').at(0);
    expect(taskHeader.text())
      .toBe('Test task');
  });

  test('viewTask invoked on click', () => {
    const viewTaskImg = wrapper.findAll('.opBarIcons').at(0);
    viewTaskImg.trigger('click');
    expect(displayActions.viewTask)
      .toBeCalled();
  });

  test('confrirmDeleteTask invoked on click', () => {
    const deleteTaskImg = wrapper.findAll('.opBarIcons').at(1);
    deleteTaskImg.trigger('click');
    expect(displayActions.confirmDeleteTask)
      .toBeCalled();
  });

  test('addTask invoked on click', () => {
    const addTaskImg = wrapper.findAll('.opBarIcons').at(2);
    addTaskImg.trigger('click');
    expect(displayActions.addTask)
      .toBeCalled();
  });

  /*
  test('highlightTasks invoked on hover', () => {
    const taskDiv = wrapper.findAll('.taskDiv').at(0);
    taskDiv.trigger('mouseover');
    expect(displayActions.addTask)
      .toBeCalled();
  });
  */
});

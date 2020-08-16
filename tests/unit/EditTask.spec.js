import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import EditTask from '@/components/EditTask.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('EditTask.vue', () => {
  let tasks = {
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
  }
  let taskId = '1bgFDzxn2me10pcNe1ee';
  let wrapper, store, propsData, displayActions, tasksActions;

  beforeEach(() => {
    propsData = {
      taskobj: tasks[taskId]
    };

    displayActions = {
      cancel: jest.fn(),
      confirmDeleteTask: jest.fn()
    };

    tasksActions = {
      updateTask: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        display: {
          namespaced: true,
          state: {
            taskId: taskId
          },
          actions: displayActions
        },
        tasks: {
          namespaced: true,
          state: {
            tasks: tasks
          },
          actions: tasksActions
        }
      }
    });

    wrapper = shallowMount(EditTask, {
      localVue,
      store,
      propsData
    });
  });

  test('Render', () => {
    expect(wrapper.exists())
      .toBeTruthy();
  });

  test('cancel invoked on click', () => {
    const cancelImg = wrapper.findAll('img').at(0);
    cancelImg.trigger('click');
    expect(displayActions.cancel)
      .toBeCalled();
  });

  test('confirmDeleteTask invoked on click', () => {
    const deleteTaskBtn = wrapper.findAll('button').at(1);
    deleteTaskBtn.trigger('click');
    expect(displayActions.confirmDeleteTask)
      .toBeCalled();
  });

  test('updateTask invoked on click', () => {
    const updateTaskBtn = wrapper.findAll('button').at(2);
    updateTaskBtn.trigger('click');
    expect(tasksActions.updateTask)
      .toBeCalled();
  });

  test('Test error checking on update', () => {
    wrapper.vm.task = '';
    wrapper.vm.description = 'aaaaa'.repeat(101);
    wrapper.vm.timeframe = '';
    wrapper.vm.startDate = '2001-01-01';
    wrapper.vm.endDate = '2000-01-01';

    const updateTaskBtn = wrapper.findAll('button').at(2);
    updateTaskBtn.trigger('click');

    expect(wrapper.vm.errors)
      .toEqual({
        task: true,
        description: true,
        timeframe: true,
        startDate: true,
        endDate: true
      });
  });


  /*
  ToDo
    Test cancelEdit
    Test inputs
  */
});

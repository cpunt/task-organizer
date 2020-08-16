import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import NewTask from '@/components/NewTask.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('NewTask.vue', () => {
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
  let wrapper, store, displayActions, tasksActions;

  beforeEach(() => {

    displayActions = {
      cancel: jest.fn(),
    };

    tasksActions = {
      addTask: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        display: {
          namespaced: true,
          state: {
            taskId: ''
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

    wrapper = shallowMount(NewTask, {
      localVue,
      store
    });
  });

  test('Render', () => {
    expect(wrapper.exists())
      .toBeTruthy();
  });

  test('cancel invoked when clicked on', () => {
    const cancelImg = wrapper.findAll('.icon').at(0);
    cancelImg.trigger('click');
    expect(displayActions.cancel)
      .toBeCalled();
  });

  test('cancel btn invoked when clicked on', () => {
    const cancelBtn = wrapper.findAll('button').at(0);
    cancelBtn.trigger('click');
    expect(displayActions.cancel)
      .toBeCalled();
  });

  test('addTask dispatched when createTask clicked on and fields are valid', () => {
    wrapper.vm.task = 'Test task';
    wrapper.vm.timeframe = 'yearly';
    wrapper.vm.startDate = '2018-01-01';
    wrapper.vm.endDate = '2025-01-01';

    const createTaskBtn = wrapper.findAll('button').at(1);
    createTaskBtn.trigger('click');

    expect(tasksActions.addTask)
      .toBeCalled();
  });

  test('Errors occur when incorrect data inputed', () => {
    wrapper.vm.task = '';
    wrapper.vm.description = 'aaaaa'.repeat(101);
    wrapper.vm.timeframe = '';
    wrapper.vm.startDate = '2009-01-01';
    wrapper.vm.endDate = '2008-01-01';

    const createTaskBtn = wrapper.findAll('button').at(1);
    createTaskBtn.trigger('click');

    expect(wrapper.vm.errors)
      .toEqual({
        task: true,
        description: true,
        timeframe: true,
        startDate: true,
        endDate: true
      });
      
    /* ToDo
    Test newTask inputs
    */
  });
});

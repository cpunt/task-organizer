import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import ViewTask from '@/components/ViewTask.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ViewTask.vue', () => {
  let wrapper, store, displayActions, tasksActions;

  beforeEach(() => {
    displayActions = {
      cancel: jest.fn(),
      addTask: jest.fn(),
      confirmDeleteTask: jest.fn()
    };

    tasksActions = {
      updateTaskCompleted: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        display: {
          namespaced: true,
          state: {
            taskId: '1bgFDzxn2me10pcNe1ee',
            bgScreen: true,
            vtask: true
          },
          actions: displayActions
        },
        tasks: {
          namespaced: true,
          state: {
            tasks: {
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
          },
          actions: tasksActions
        }
      }
    });

    wrapper = shallowMount(ViewTask, {
      localVue,
      store
    });
  });

  test('ViewTask renders', () => {
    expect(wrapper.exists())
      .toBeTruthy();
  });

  test('cancel is invoked on click', () => {
    const cancelImg = wrapper.findAll('.icon').at(0);
    cancelImg.trigger('click');
    expect(displayActions.cancel)
      .toBeCalled();
  });

  test('Toggle edit', () => {
    const editImg = wrapper.findAll('.icon').at(1);
    editImg.trigger('click');
    expect(wrapper.vm.edit)
      .toBeTruthy();
  });

  test('confirmDeleteTask is invoked on click', () => {
    const deleteImg = wrapper.findAll('.icon').at(2);
    deleteImg.trigger('click');
    expect(displayActions.confirmDeleteTask)
      .toBeCalled();
  });

  test('addTask is invoked on click', () => {
    const addTaskImg = wrapper.findAll('.icon').at(3);
    addTaskImg.trigger('click');
    expect(displayActions.addTask)
      .toBeCalled();
  });

  // ToDo
  // test('updateTaskCompleted is invoked on click', () => {
  //   const button = wrapper.findAll('button').at(0);
  //   button.trigger('click');
  //   expect(wrapper.vm.updateTaskCompleted)
  //     .toBeCalled();
  // });

  // ToDo could potentially test all the task data make sure is display whats expected
});

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import DeleteTask from '@/components/DeleteTask.vue';
import { cancelByEsc } from '@/components/DeleteTask.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DeleteTask.vue', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        display: {
          namespaced: true,
          state: {
            taskId: '1bgFDzxn2me10pcNe1ee'
          }
        },
        tasks: {
          namespaced: true,
          state: {
            tasks: {
              '1bgFDzxn2me10pcNe1ee': {
                task: 'Test task'
              }
            }
          }
        }
      }
    }),
    wrapper = shallowMount(DeleteTask, {
      localVue,
      store
    });
  });

  test('Renders...', () => {
    expect(wrapper.exists())
      .toBeTruthy();
  });

  test('Delete message', () => {
    expect(wrapper.find('h3').text())
      .toBe('Are you sure you want to delete task:Test task?');
  });

  // ToDo test deleteTask called
  // test('When Delete button clicked delete called', () => {
  //
  // });

  // ToDo test cancelByEsc called
  // test('When esc clicked cancelByEsc called', () => {
  //   const cancelByEsc = jest.fn();
  //   wrapper.trigger('keyup.esc');
  //   expect(cancelByEsc)
  //     .toHaveBeenCalled();
  // });
});

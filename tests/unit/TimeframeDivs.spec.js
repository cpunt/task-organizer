import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'
import TimeframeDivs from '@/components/TimeframeDivs.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TimeframeDivs.vue', () => {
  let wrapper, store, propsData, tasks;

  beforeEach(() => {
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
      timeframetasks: ['1bgFDzxn2me10pcNe1ee'],
      timeframe: 'yearly'
    };

    store = new Vuex.Store({
      modules: {
        sidebar: {
          namespaced: true,
          state: {
            dateSelected: '',
            taskSelected: ''
          }
        },
        tasks: {
          namespaced: true,
          state: {
            tasks: tasks
          }
        },
        dates: {
          namespaced: true,
          state: {
            dates: {
              yearly: [
                {
                  date: new Date(2020, 0),
                  tasks: ['1bgFDzxn2me10pcNe1ee']
                },
                {
                  date: new Date(2021, 0),
                  tasks: ['1bgFDzxn2me10pcNe1ee']
                }
              ],
              monthly: [],
              weekly: [],
              daily: []
            },
            datesRange: {
              yearly: {},
              monthly: {},
              weekly: {},
              daily: {}
            }
          }
        }
      }
    });

    wrapper = shallowMount(TimeframeDivs, {
      localVue,
      store,
      propsData
    });
  });

  test('TimeframeDivs renders', () => {
    expect(wrapper.exists())
      .toBeTruthy();
  });

  /* ToDo Add some sort of testing to this component */
});

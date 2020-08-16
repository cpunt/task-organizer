import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BackgroundScreen from '@/components/BackgroundScreen.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('BackgroundScreen.vue', () => {
  let wrapper;
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      cancel: jest.fn()
    },
    store = new Vuex.Store({
      modules: {
        display: {
          actions,
          namespaced: true
        }
      }
    }),
    wrapper = shallowMount(BackgroundScreen, { store, localVue });
  });

  test('Calls cancel when div clicked', () => {
    wrapper.find('.backgroundScreen').trigger('click');
    expect(actions.cancel).toHaveBeenCalled();
  });
});

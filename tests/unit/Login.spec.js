import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Login from '@/components/Login.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Login.vue', () => {
  let wrapper, store, actions, displayActions;

  beforeEach(() => {
    actions = {
      login: jest.fn()
    };

    displayActions = {
      cancel: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        display: {
          namespaced: true,
          actions: displayActions
        }
      },
      actions: actions
    });

    wrapper = shallowMount(Login, {
      store,
      localVue
     });
  });

  test('Login renders', () => {
    expect(wrapper.exists())
      .toBeTruthy();
  });

  test('cancel invoked on click', () => {
    const cancelImg = wrapper.findAll('img').at(0);
    cancelImg.trigger('click');

    expect(displayActions.cancel)
      .toBeCalled();
  });

  test('login invoked on click', () => {
    const loginP = wrapper.findAll('p').at(0);
    loginP.trigger('click');

    expect(actions.login)
      .toBeCalled();
  });
});

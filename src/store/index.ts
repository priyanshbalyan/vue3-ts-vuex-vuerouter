import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { ApplicationState } from "@interfaces";
import { getters } from "@store/getters";
import { mutations } from "@store/mutations";
import { actions } from "@store/actions";

// define injection key
export const key: InjectionKey<Store<ApplicationState>> = Symbol();

// Create a new store instance.
const store = createStore({
  state: {
    news: [],
    sources: [],
    error: null,
    isLoading: false,
  },
  getters,
  mutations,
  actions,
});

export default store;

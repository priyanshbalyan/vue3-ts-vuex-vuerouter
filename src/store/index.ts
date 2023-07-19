import { createStore, type Store } from 'vuex'
import { type InjectionKey } from 'vue'
import { type ApplicationState } from '@interfaces'
import { getters } from '@store/getters'
import { mutations } from '@store/mutations'
import { actions } from '@store/actions'

// define injection key
export const key: InjectionKey<Store<ApplicationState>> = Symbol('store injection key')

// Create a new store instance.
const store = createStore({
  state: {
    news: [],
    sources: [],
    error: null,
    isLoading: false,
    visited: []
  },
  getters,
  mutations,
  actions
})

export default store

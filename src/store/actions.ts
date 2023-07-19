import {
  FETCH_NEWS,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  SET_NEWS,
  SET_SOURCES,
  FETCH_SOURCES,
  FETCH_WRONG_CALL,
  UPDATE_HEADLINE,
  UPDATE_VISITED
} from '@store/events'
import { getNews, getSources, getWrongApiCall } from '@services/api'
import { type Payload, type VisitedLink } from '@interfaces'

export const actions = {
  async [FETCH_NEWS] ({ commit }, payload?: string) {
    commit(SET_LOADING, true)
    const [response, error] = await getNews(payload)
    if ((error != null) || (response == null)) {
      commit(SET_ERROR, error?.message)
    } else {
      commit(SET_NEWS, (response.articles != null) || [])
    }
    commit(SET_LOADING, false)
  },
  async [CLEAR_ERROR] ({ commit }) {
    commit(CLEAR_ERROR)
  },
  async [FETCH_SOURCES] ({ commit }) {
    commit(SET_LOADING, true)
    const [response, error] = await getSources()
    if ((error != null) || (response == null)) {
      commit(SET_ERROR, error?.message)
    } else {
      commit(SET_SOURCES, (response.sources != null) || [])
    }
    commit(SET_LOADING, false)
  },
  async [FETCH_WRONG_CALL] ({ commit }) {
    commit(SET_LOADING, true)
    const [response, error] = await getWrongApiCall()
    if ((error != null) || (response == null)) {
      commit(SET_ERROR, error?.message)
    }
    commit(SET_LOADING, false)
  },
  [UPDATE_HEADLINE] ({ commit }, payload: Payload) {
    commit(UPDATE_HEADLINE, payload)
  },
  [UPDATE_VISITED] ({ commit }, payload: VisitedLink) {
    commit(UPDATE_VISITED, payload)
  }
}

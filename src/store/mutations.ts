import { ApplicationState } from "@store/index";
import { Article, Source, Payload } from "@interfaces";
import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  SET_NEWS,
  SET_SOURCES,
  UPDATE_HEADLINE,
  UPDATE_VISITED,
} from "@store/events";

export const mutations = {
  [SET_NEWS](state: ApplicationState, payload: Article[]) {
    state.news = payload;
  },
  [SET_SOURCES](state: ApplicationState, payload: Source[]) {
    state.sources = payload;
  },
  [SET_ERROR](state: ApplicationState, error: string) {
    state.error = error;
  },
  [CLEAR_ERROR](state: ApplicationState) {
    state.error = null;
  },
  [SET_LOADING](state: ApplicationState, payload: boolean) {
    state.isLoading = payload;
  },
  [UPDATE_HEADLINE](state: ApplicationState, payload: Payload) {
    const updatedNews = state.news.map((newsItem) => {
      if (newsItem.title === payload.text) {
        newsItem.title = payload.newText;
      }
      return newsItem;
    });
    state.news = [...updatedNews];
  },
  [UPDATE_VISITED](state: ApplicationState, payload: string) {
    const items = [...state.visited, payload];
    state.visited = [...new Set(items)];
  },
};

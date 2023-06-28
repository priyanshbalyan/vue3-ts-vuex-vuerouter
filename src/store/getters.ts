import { ApplicationState } from "@store";
import { Article, Source } from "@interfaces";

export const getters = {
  getNews(state: ApplicationState): Article[] {
    return state.news;
  },
  getError(state: ApplicationState): string | null {
    return state.error;
  },
  getLoading(state: ApplicationState): boolean {
    return state.isLoading;
  },
  getSources(state: ApplicationState): Source[] {
    return state.sources;
  },
  getVisited(state: ApplicationState): string[] {
    return state.visited;
  },
};

import {
  type Article,
  type ApplicationState,
  type ArticleSource,
  type VisitedLink
} from '@interfaces'

export const getters = {
  getNews (state: ApplicationState): Article[] {
    return state.news
  },
  getError (state: ApplicationState): string | null {
    return state.error
  },
  getLoading (state: ApplicationState): boolean {
    return state.isLoading
  },
  getSources (state: ApplicationState): ArticleSource[] {
    return state.sources
  },
  getVisited (state: ApplicationState): VisitedLink[] {
    return state.visited
  }
}

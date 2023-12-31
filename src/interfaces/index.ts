export interface ApiResponse {
  status: string
  totalResults: number
  articles?: Article[]
  sources?: Source[]
}

export interface ApplicationState {
  news: Article[]
  error: string | null
  isLoading: boolean
  sources: Array<{ id: string, name: string }>
  visited: VisitedLink[]
}

export interface VisitedLink {
  title: string
  link: string
}

export interface ArticleSource {
  id: string
  name: string
}

export interface Article {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: Date
  content: string
}

export interface Source {
  id: string
  name: string
  description: string
  url: string
  category: string
  country: string
}

export interface Payload {
  text: string
  newText: string
}

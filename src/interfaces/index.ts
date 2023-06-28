export interface ApplicationState {
  news: Article[];
  error: string | null;
  isLoading: boolean;
  sources: { id: string; name: string }[];
  visited: string[];
}

export interface ApiResponse {
  status: string;
  totalResults: number;
  articles?: Article[];
  sources?: Source[];
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  country: string;
}

export interface Payload {
  text: string;
  newText: string;
}

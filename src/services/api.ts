import axios from "axios";
import { ApiResponse } from "@interfaces/index";
import { API_KEY, VERSION } from "config";

type Response = Promise<[ApiResponse | null, Error | null]>;

const getUrl = (endpoint: string, params: Record<string, string>): string => {
  const queryParams = new URLSearchParams({
    ...params,
    apiKey: API_KEY,
  }).toString();
  return `/api/${VERSION}/${endpoint}?${queryParams}`;
};

export const getResponse = async (url: string): Response => {
  try {
    const response = await axios.get(url);
    const data: ApiResponse = response.data;
    if (data.status == "ok") {
      return [data, null];
    } else {
      return [null, new Error("An error occured whle fetching")];
    }
  } catch (error: any) {
    console.log(error);
    return [null, error];
  }
};

export const getNews = (searchText?: string): Response => {
  const params: Record<string, string> = { country: "us" };
  if (searchText) {
    params.q = searchText;
  }
  const url = getUrl("top-headlines", params);
  return getResponse(url);
};

export const getSources = (): Response => {
  const params = {};
  const url = getUrl("sources", params);
  return getResponse(url);
};

export const getWrongApiCall = (): Response => {
  return getResponse("https://newsapi.org/v2/sources?apiKey");
};

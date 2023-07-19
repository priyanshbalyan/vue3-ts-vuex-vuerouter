import axios from 'axios'
import { type ApiResponse } from '@interfaces/index'
import { API_KEY, VERSION } from 'config'

type Response = Promise<[ApiResponse | null, Error | null]>

const getUrl = (endpoint: string, params: Record<string, string>): string => {
  const queryParams = new URLSearchParams({
    ...params,
    apiKey: API_KEY
  }).toString()
  return `/api/${VERSION as string}/${endpoint}?${queryParams}`
}

export const getResponse = async (url: string): Response => {
  try {
    const response = await axios.get(url)
    const data: ApiResponse = response.data
    if (data.status === 'ok') {
      return [data, null]
    } else {
      return [null, new Error('An error occured whle fetching')]
    }
  } catch (error: any) {
    console.log(error)
    return [null, error]
  }
}

export const getNews = async (searchText?: string): Response => {
  const params: Record<string, string> = { country: 'us' }
  if ((searchText != null) && searchText.length > 0) {
    params.q = searchText
  }
  const url = getUrl('top-headlines', params)
  return await getResponse(url)
}

export const getSources = async (): Response => {
  const params = {}
  const url = getUrl('sources', params)
  return await getResponse(url)
}

export const getWrongApiCall = async (): Response => {
  return await getResponse('https://newsapi.org/v2/sources?apiKey')
}

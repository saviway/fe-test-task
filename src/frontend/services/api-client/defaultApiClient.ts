import axios, { AxiosResponse } from 'axios'

/**
 * Default header
 */
export const DEFAULT_HEADERS: Record<string, string> = {
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=UTF-8',
}

/**
 * Describes API response
 */
export interface IAPIResponse<T> {
  ok: boolean
  result: T
}

/**
 * API client.
 * Due to backend provides only endpoints with GET & POST methods the API client has only ones definitions
 */
export interface IAPIClient {
  post<R extends {}, T>(url: string, body: R | null): Promise<T>
  get<T>(url: string): Promise<T>
}

/**
 * Config
 */
export interface IAPIClientConfig {
  baseUrl: string
}

/**
 * The factory to create api client
 * @param config {IAPIClientConfig}
 * @return ApiClient
 */
export const defaultApiClientFactory = (config: IAPIClientConfig): IAPIClient => ({
  post: async <R extends {}, T>(url: string, body: R | null): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      return axios({
        url,
        baseURL: config.baseUrl,
        headers: { ...DEFAULT_HEADERS },
        method: 'post',
        data: body,
      })
        .then((response: AxiosResponse<unknown>) => {
          resolve(response.data as T)
        })
        .catch((err) => reject(err))
    })
  },
  get: async <T>(url: string): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      return axios({
        url,
        baseURL: config.baseUrl,
        headers: { ...DEFAULT_HEADERS },
        method: 'get',
      })
        .then((response: AxiosResponse<unknown>) => {
          resolve(response.data as T)
        })
        .catch((err) => reject(err))
    })
  },
})

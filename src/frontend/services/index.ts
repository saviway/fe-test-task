import { defaultApiClientFactory } from './api-client/defaultApiClient'

export { defaultApiClientFactory } from './api-client/defaultApiClient'
export type { IAPIResponse } from './api-client/defaultApiClient'

// as an improvement base url can be moved to separated config file.
export const defaultApiClient = defaultApiClientFactory({
  baseUrl: 'http://localhost:3000/api',
})

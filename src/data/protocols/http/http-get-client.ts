import { HttpResponse } from './http-response'

export interface HttpGetClient<R = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>
}

export type HttpGetParams = {
  url: string
  headers?: any
}

import { HttpResponse } from './http-response'

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpRequest = {
  url: string
  method: HttpMethods
  headers?: any
  body?: any
}

export type HttpMethods = 'post' | 'get' | 'put' | 'delete'

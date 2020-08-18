export interface HttpGetClient {
  get: (params: HttpGetParams) => Promise<void>
}

export type HttpGetParams = {
  url: string
}

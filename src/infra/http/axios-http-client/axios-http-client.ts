import { HttpRequest, HttpResponse, HttpClient } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        headers: data.headers,
        data: data.body
      })
    } catch (e) {
      axiosResponse = e.response
    }
    return {
      body: axiosResponse.data,
      statusCode: axiosResponse.status
    }
  }
}

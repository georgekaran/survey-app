import { HttpGetClient, HttpResponse, HttpGetParams } from '@/data/protocols/http'
import { GetStorage } from '@/data/protocols/cache/get-storage'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (private readonly getStorage: GetStorage) {}

  async get (params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('account')
    return null
  }
}

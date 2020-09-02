import { HttpClient, HttpResponse, HttpRequest } from '@/data/protocols/http'
import { GetStorage } from '@/data/protocols/cache/get-storage'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient
  ) {}

  async request (data: HttpRequest): Promise<HttpResponse> {
    let dataWithToken = data
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      dataWithToken = Object.assign({},
        data,
        {
          headers: {
            ...data?.headers,
            'x-access-token': account.accessToken
          }
        }
      )
    }
    return await this.httpClient.request(dataWithToken)
  }
}

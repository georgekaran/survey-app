import { HttpGetClient, HttpResponse, HttpGetParams } from '@/data/protocols/http'
import { GetStorage } from '@/data/protocols/cache/get-storage'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse> {
    let paramsWithToken = params
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      paramsWithToken = Object.assign({},
        params,
        {
          headers: {
            ...params?.headers,
            'x-access-token': account.accessToken
          }
        }
      )
    }
    await this.httpGetClient.get(paramsWithToken)
    return null
  }
}

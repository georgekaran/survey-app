import { HttpClient } from '@/data/protocols/http'
import { AuthorizeHttpClientDecorator } from '@/main/decorators/authorize-http-client-decorator/authorize-http-client-decorator'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}

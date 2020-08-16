import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { AddAccount } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/singup'), makeAxiosHttpClient())
}

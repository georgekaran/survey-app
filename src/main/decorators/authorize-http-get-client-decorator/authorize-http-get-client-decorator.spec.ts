import { AuthorizeHttpGetClientDecorator } from './authorize-http-get-client-decorator'
import { mockGetRequest } from '@/data/test'
import { GetStorageSpy } from '@/data/test/moch-cache'

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
    sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})

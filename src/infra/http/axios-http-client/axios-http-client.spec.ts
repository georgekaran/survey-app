import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockPostRequest, mockGetRequest } from '@/data/test'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  describe('post', () => {
    test('Should call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockPostRequest()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return correct statusCode and body for post', () => {
      const { sut, mockedAxios } = makeSut()
      const promiseResponse = sut.post(mockPostRequest())
      expect(promiseResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('Should return the correct statusCode and body on post failure', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const promiseResponse = sut.post(mockPostRequest())
      expect(promiseResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })

  describe('get', () => {
    test('Should call axios.get with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockGetRequest()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })
  })
})

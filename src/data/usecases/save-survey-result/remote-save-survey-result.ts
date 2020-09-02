import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { RemoteSurveyResultModel } from '@/data/models/remote-survey-result-model'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteSaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<SaveSurveyResult.Model>
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const httpResponse = await this.httpClient.request({
      method: 'put',
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}

import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'
import { HttpClient } from '@/data/protocols/http'
import { RemoteSurveyResultModel } from '@/data/models/remote-survey-result-model'

export class RemoteSaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.httpClient.request({
      method: 'put',
      url: this.url
    })
    return null
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}

import { LoadSurveyResult } from '@/domain/usecases'
import { HttpGetClient } from '@/data/protocols/http'

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async load (): Promise<LoadSurveyResult.Model> {
    this.httpGetClient.get({
      url: this.url
    })
    return null
  }
}

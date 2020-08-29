import { LoadSurveyResult } from '@/domain/usecases'
import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async load (): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      case HttpStatusCode.notFound:
      case HttpStatusCode.serverError:
        throw new UnexpectedError()
    }
    return null
  }
}

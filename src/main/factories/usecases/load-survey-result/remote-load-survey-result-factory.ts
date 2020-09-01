import { LoadSurveyResult } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decoratos/authorize-http-get-client-decorator-factory'
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpGetClientDecorator())
}

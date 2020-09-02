import { SurveyResultModel, SurveyResultAnswer } from '@/domain/models'

export interface SaveSurveyResult {
  save: (params: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Model>
}

export namespace SaveSurveyResult {
  export type Model = SurveyResultModel

  export type Params = SurveyResultAnswer
}

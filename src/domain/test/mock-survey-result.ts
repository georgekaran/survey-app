import faker from 'faker'
import { LoadSurveyResult } from '@/domain/usecases'
import { SaveSurveyResult } from '../usecases/save-survey-result'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.word()
})

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  surveyId: faker.random.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.word(),
    count: faker.random.number(),
    percent: faker.random.number(100),
    isCurrentAccountAnswer: true
  }, {
    answer: faker.random.word(),
    count: faker.random.number(),
    percent: faker.random.number(100),
    isCurrentAccountAnswer: false
  }]
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult: LoadSurveyResult.Model = mockSurveyResultModel()

  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return this.surveyResult
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  data: SaveSurveyResult.Params
  callsCount = 0
  surveyResult = mockSurveyResultModel()

  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.data = data
    this.callsCount++
    return this.surveyResult
  }
}

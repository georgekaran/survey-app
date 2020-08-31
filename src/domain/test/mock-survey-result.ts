import faker from 'faker'
import { LoadSurveyResult } from '@/domain/usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  surveyId: faker.random.uuid(),
  question: faker.random.words(10),
  answers: [{
    count: faker.random.number(),
    percent: faker.random.number(100),
    image: faker.internet.url(),
    answer: faker.random.word(),
    isCurrentAccountAnswer: faker.random.boolean()
  }, {
    count: faker.random.number(),
    percent: faker.random.number(100),
    answer: faker.random.word(),
    isCurrentAccountAnswer: faker.random.boolean()
  }],
  date: faker.date.recent()
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0

  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return null
  }
}

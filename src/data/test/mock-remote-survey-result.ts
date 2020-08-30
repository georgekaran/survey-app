import faker from 'faker'
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  surveyId: faker.random.uuid(),
  question: faker.random.words(),
  answers: [{
    count: faker.random.number(),
    percent: faker.random.number(100),
    image: faker.internet.url(),
    answer: faker.random.word(),
    isCurrentAccountAnswer: false
  }, {
    count: faker.random.number(),
    percent: faker.random.number(100),
    image: faker.internet.url(),
    answer: faker.random.word(),
    isCurrentAccountAnswer: true
  }],
  date: faker.date.recent().toISOString()
})

import { SurveyModel } from '@/domain/models'
import faker from 'faker'

export const mockSurveyListModel = (): SurveyModel[] => ([{
  id: faker.random.uuid(),
  question: faker.random.words(),
  answers: [{
    answer: faker.random.word(),
    image: faker.internet.url()
  }, {
    answer: faker.random.words()
  }],
  date: faker.date.recent(),
  didAnswer: false
}])

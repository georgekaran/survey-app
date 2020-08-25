import { Authentication } from '@/domain/usecases'
import faker from 'faker'

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): Authentication.Model => ({
  accessToken: faker.random.uuid(),
  name: faker.name.findName()
})

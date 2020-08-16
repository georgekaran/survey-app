import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (fieldName: string): EmailValidation => new EmailValidation(fieldName)

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const fieldName = faker.random.word()
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: faker.random.word() })
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('should return falsy if email is valid', () => {
    const fieldName = faker.random.word()
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('should return falsy if email is empty', () => {
    const fieldName = faker.random.word()
    const sut = makeSut(fieldName)
    const error = sut.validate({ [fieldName]: '' })
    expect(error).toBeFalsy()
  })
})

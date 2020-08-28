import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'
import faker from 'faker'

const makeSut = (fieldName: string, minLength: number): MinLengthValidation => new MinLengthValidation(fieldName, minLength)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName, 5)
    const error = sut.validate({ [fieldName]: faker.random.alphaNumeric(3) })
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if value is valid', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName, 5)
    const error = sut.validate({ [fieldName]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if fieldName does not exist', () => {
    const sut = makeSut('any_field', 5)
    const error = sut.validate({ invalid_field: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})

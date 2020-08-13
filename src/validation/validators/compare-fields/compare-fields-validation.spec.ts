import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (valueToCompare: string, fieldName: string = faker.database.column()): CompareFieldsValidation => new CompareFieldsValidation(fieldName, valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(faker.random.word(), fieldName)
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })
})

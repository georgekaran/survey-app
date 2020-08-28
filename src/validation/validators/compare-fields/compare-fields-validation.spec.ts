import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (fieldName: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(fieldName, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const fieldName = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(fieldName, fieldToCompare)
    const error = sut.validate({
      [fieldToCompare]: 'any_value',
      [fieldName]: 'other_value'
    })
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if compare is valid', () => {
    const fieldName = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(fieldName, fieldToCompare)
    const error = sut.validate({
      [fieldToCompare]: value,
      [fieldName]: value
    })
    expect(error).toBeFalsy()
  })
})

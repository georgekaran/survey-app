import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (fieldName: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(fieldName, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const fieldName = 'any_field'
    const fieldToCompare = 'other_field'
    const sut = makeSut(fieldName, fieldToCompare)
    const error = sut.validate({
      [fieldName]: 'any_value',
      [fieldToCompare]: 'other_value'
    })
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if compare is valid', () => {
    const fieldName = 'any_field'
    const fieldToCompare = 'other_field'
    const value = faker.random.word()
    const sut = makeSut(fieldName, fieldToCompare)
    const error = sut.validate({
      [fieldToCompare]: value,
      [fieldName]: value
    })
    expect(error).toBeFalsy()
  })
})

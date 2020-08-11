import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldValidations = ValidationBuilder.field('any_field').required().build()
    expect(fieldValidations).toEqual([new RequiredFieldValidation('any_field')])
  })
})

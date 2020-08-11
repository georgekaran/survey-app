import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'
import { ValidationBuilder } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldValidations = ValidationBuilder.field('any_field').required().build()
    expect(fieldValidations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return EmailValidation', () => {
    const fieldValidations = ValidationBuilder.field('any_field').email().build()
    expect(fieldValidations).toEqual([new EmailValidation('any_field')])
  })

  test('Should return MinLengthValidation', () => {
    const fieldValidations = ValidationBuilder.field('any_field').min(5).build()
    expect(fieldValidations).toEqual([new MinLengthValidation('any_field', 5)])
  })
})

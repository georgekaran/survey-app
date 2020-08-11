import faker from 'faker'
import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'
import { ValidationBuilder } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const fieldValidations = ValidationBuilder.field(field).required().build()
    expect(fieldValidations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const fieldValidations = ValidationBuilder.field(field).email().build()
    expect(fieldValidations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const fieldValidations = ValidationBuilder.field(field).min(length).build()
    expect(fieldValidations).toEqual([new MinLengthValidation(field, length)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const fieldValidations = ValidationBuilder.field(field).required().min(length).email().build()
    expect(fieldValidations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})

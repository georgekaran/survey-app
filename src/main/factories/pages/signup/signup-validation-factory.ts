import { ValidationComposite, RequiredFieldValidation, MinLengthValidation, EmailValidation, CompareFieldsValidation } from '@/validation/validators'

export const makeSignupValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    new RequiredFieldValidation('name'),
    new MinLengthValidation('name', 5),
    new RequiredFieldValidation('email'),
    new EmailValidation('email'),
    new RequiredFieldValidation('password'),
    new MinLengthValidation('password', 5),
    new RequiredFieldValidation('passwordConfirmation'),
    new CompareFieldsValidation('passwordConfirmation', 'password')
  ])
}

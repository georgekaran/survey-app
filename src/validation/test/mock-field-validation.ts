import { FieldValidation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null
  constructor (readonly fieldName: string) {}

  validate (input: object): Error {
    return this.error
  }
}

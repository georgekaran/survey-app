import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}

  validate (input: object): Error {
    return input[this.fieldName] ? null : new RequiredFieldError()
  }
}

import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}
  validate (fieldValue: string): Error {
    return new InvalidFieldError(this.fieldName)
  }
}

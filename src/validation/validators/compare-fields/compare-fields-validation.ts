import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly fieldName: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: object): Error {
    return input[this.fieldName] !== input[this.fieldToCompare] ? new InvalidFieldError(this.fieldName) : null
  }
}

import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly fieldName: string,
    private readonly valueToCompare: string
  ) {}

  validate (fieldValue: string): Error {
    return new InvalidFieldError(this.fieldName)
  }
}

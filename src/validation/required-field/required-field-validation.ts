import { FieldValidation } from '@/validation/protocols'
import { RequiredFieldError } from '@/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}

  validate (fieldValue: string): Error {
    return new RequiredFieldError()
  }
}

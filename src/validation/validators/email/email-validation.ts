import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor (readonly fieldName: string) {}
  validate (input: object): Error {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (!input[this.fieldName] || emailRegex.test(input[this.fieldName])) ? null : new InvalidFieldError(this.fieldName)
  }
}

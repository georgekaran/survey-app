export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`Invalid ${fieldName} error`)
    this.name = 'InvalidFieldError'
  }
}

export class InvalidEmailError extends Error implements DomainError {
  public constructor(email: string) {
    super(`The email "${email}" is invalid.`)
    this.name = 'InvalidEmailError'
  }
}
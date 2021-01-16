import { PasswordHasherError } from "./password-hasher-error"

export class WrongPasswordError extends Error implements PasswordHasherError {
  public constructor(password: string) {
    super(`The password "${password}" is wrong.`)
    this.name = 'WrongPasswordError'
  }
}
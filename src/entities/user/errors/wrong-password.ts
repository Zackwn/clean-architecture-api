import { DomainError } from "./domain-error";

export class WrongPasswordError extends Error implements DomainError {
  public constructor(password: string) {
    super(`The password "${password}" is wrong.`)
    this.name = 'WrongPasswordError'
  }
}
import { Either, left, right } from "../../shared/either"
import { InvalidEmailError } from "./errors/invalid-email"

export class Email {
  private readonly email: string

  get value(): string {
    return this.email
  }

  private constructor(email: string) {
    this.email = email
    Object.freeze(this)
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (!Email.validate(email)) {
      return left(new InvalidEmailError(email))
    }
    return right(new Email(email))
  }

  static validate(email: string) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email)) {
      return false
    }

    if (email.length >= 256) {
      return false
    }

    const [account, address] = email.split('@')

    if (account.length >= 64) {
      return false
    }

    const domainParts = address.split('.')

    if (domainParts.some(part => part.length > 64)) {
      return false
    }

    return true
  }
}
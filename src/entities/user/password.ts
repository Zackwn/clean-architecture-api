import { Either, left, right } from "../../shared/either"
import { InvalidPasswordError } from "./errors/invalid-password"
import { User } from "./user"

export class Password {
  private readonly password: string

  get value(): string {
    return this.password
  }

  private constructor(password: string) {
    this.password = password
    Object.freeze(this)
  }

  static validate(password: string): boolean {
    if (password.length <= 6) {
      return false
    }

    return true
  }

  static async create(password: string): Promise<Either<InvalidPasswordError, Password>> {
    if (!Password.validate(password)) {
      return left(new InvalidPasswordError(password))
    }
    return right(new Password(password))
  }
}
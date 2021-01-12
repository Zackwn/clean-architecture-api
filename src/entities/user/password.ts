import { Either, left, right } from "../../shared/either"
import { InvalidPasswordError } from "./errors/invalid-password"
import { hash } from 'bcrypt'

export class Password {
  private readonly password: string

  get value(): string {
    return this.password
  }

  private constructor(password: string) {
    this.password = password
    Object.freeze(this)
  }

  static async encrypt(password: string, salt?: number): Promise<string> {
    const encryptedPassword = await hash(password, salt || 8)
    return encryptedPassword
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
    const encryptedPassword = await Password.encrypt(password)
    return right(new Password(encryptedPassword))
  }
}
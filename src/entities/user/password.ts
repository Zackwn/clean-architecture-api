import { Either, left, right } from "../../shared/either"
import { InvalidPasswordError } from "./errors/invalid-password"
import { hash, compare } from 'bcrypt'
import { WrongPasswordError } from "./errors/wrong-password"

export class Password {
  private readonly password: string

  get value(): string {
    return this.password
  }

  private constructor(password: string) {
    this.password = password
    Object.freeze(this)
  }

  static async hash(password: string, salt?: number): Promise<string> {
    const encryptedPassword = await hash(password, salt || 8)
    return encryptedPassword
  }

  static async verify(password: string, hash: string): Promise<Either<WrongPasswordError, string>> {
    const isPasswordCorrect = await compare(password, hash)
    if (isPasswordCorrect) {
      return right(password)
    }
    return left(new WrongPasswordError(password))
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
    const encryptedPassword = await Password.hash(password)
    return right(new Password(encryptedPassword))
  }
}
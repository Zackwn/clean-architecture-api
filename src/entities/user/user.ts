import { compare, hash } from "bcrypt"
import { Either, left, right } from "../../shared/either"
import { Email } from "./email"
import { InvalidEmailError } from "./errors/invalid-email"
import { InvalidNameError } from "./errors/invalid-name"
import { WrongPasswordError } from "./errors/wrong-password"
import { Name } from "./name"
import { Password } from "./password"
import { UserData } from "./user-data"

export class User {
  public readonly name: Name
  public readonly email: Email
  public readonly password: Password

  private constructor(name: Name, email: Email, password: Password) {
    this.name = name
    this.email = email
    this.password = password
    Object.freeze(this)
  }

  static async create(userData: UserData): Promise<Either<InvalidNameError | InvalidEmailError, User>> {
    const nameOrError = Name.create(userData.name)
    const emailOrError = Email.create(userData.email)
    const passwordOrError = await Password.create(userData.password)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }
    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }
    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    const name: Name = nameOrError.value
    const email: Email = emailOrError.value
    const password: Password = passwordOrError.value

    return right(new User(name, email, password))
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
}
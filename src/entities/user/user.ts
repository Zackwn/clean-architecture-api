import { compare, hash } from "bcrypt"
import { Either, left, right } from "../../shared/either"
import { Email } from "./email"
import { InvalidEmailError } from "./errors/invalid-email"
import { InvalidNameError } from "./errors/invalid-name"
import { WrongPasswordError } from "../../adapters/password-hasher/errors/wrong-password"
import { Name } from "./name"
import { Password } from "./password"
import { UserData } from "./user-data"
import { ID } from "./id"

export class User {
  public readonly name: Name
  public readonly email: Email
  public readonly password: Password
  public readonly id: ID

  private constructor(name: Name, email: Email, password: Password, id: ID) {
    this.name = name
    this.email = email
    this.password = password
    this.id = id
    Object.freeze(this)
  }

  static async create(userData: Omit<UserData, 'id'>): Promise<Either<InvalidNameError | InvalidEmailError, User>> {
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

    const id: ID = ID.create()

    const name: Name = nameOrError.value
    const email: Email = emailOrError.value
    const password: Password = passwordOrError.value

    return right(new User(name, email, password, id))
  }
}
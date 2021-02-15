import { Either, left, right } from "../../shared/either"
import { Email } from "./email"
import { InvalidEmailError } from "./errors/invalid-email"
import { InvalidNameError } from "./errors/invalid-name"
import { ID } from "./id"
import { IsAdmin } from "./is-admin"
import { Name } from "./name"
import { Password } from "./password"
import { RoleID } from "./role-id"
import { UserData } from "./user-data"

export class User {
  public readonly name: Name
  public readonly email: Email
  public readonly password: Password
  public readonly id: ID
  public readonly role_id: RoleID | null
  public readonly is_admin: IsAdmin

  private constructor(
    name: Name,
    email: Email,
    password: Password,
    id: ID,
    isAdmin: IsAdmin,
    roleID: RoleID | null
  ) {
    this.name = name
    this.email = email
    this.password = password
    this.id = id
    this.role_id = roleID
    this.is_admin = isAdmin
    Object.freeze(this)
  }

  static create(userData: Omit<UserData, 'id'>): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    const emailOrError = Email.create(userData.email)
    const passwordOrError = Password.create(userData.password)
    const roleID: RoleID | null = userData.role_id ? RoleID.create(userData.role_id) : null
    const isAdmin = IsAdmin.create(userData.is_admin)

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

    return right(new User(name, email, password, id, isAdmin, roleID))
  }
}
import { UserData } from "../../../entities/user/user-data";
import { Either, left, right } from "../../../shared/either";
import { UserRepository, UpdateUserData } from "../../../usecases/ports/user-repository";
import { UserAlredyExistsError } from "../../errors/user/user-alredy-exists"
import { UserDoNotExistsError } from '../../errors/user/user-do-not-exists'

export class InMemoryUserRepository implements UserRepository {
  private users: UserData[] = []

  public constructor(users: UserData[] = []) {
    this.users = users
  }

  public async findByEmail(email: string): Promise<Either<UserDoNotExistsError, UserData>> {
    const userOrUndefined: UserData | undefined = this.users.find(user => user.email === email)

    if (userOrUndefined === undefined) {
      return left(new UserDoNotExistsError(email))
    }

    return right(userOrUndefined)
  }

  public async findById(id: string): Promise<Either<UserDoNotExistsError, UserData>> {
    const userOrUndefined: UserData | undefined = this.users.find(user => user.id === id)

    if (userOrUndefined === undefined) {
      return left(new UserDoNotExistsError(id))
    }

    return right(userOrUndefined)
  }

  public async updateUser(id: string, user: UpdateUserData): Promise<Either<UserDoNotExistsError, UserData>> {
    const userOrError = await this.findById(id)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const updatedUserData: UserData = { ...userOrError.value, ...user }

    this.users = this.users.filter(user => {
      return user.id !== user.id
    })

    await this.save(updatedUserData)
    return right(updatedUserData)
  }

  public async exists(email: string): Promise<boolean> {
    const userOrError = await this.findByEmail(email)
    // error -> UserDoesNotExists
    if (userOrError.isLeft()) {
      return false
    }
    return true
  }

  public async save(userData: UserData): Promise<Either<UserAlredyExistsError, UserData>> {
    if (!(await this.exists(userData.email))) {
      this.users.push(userData)
      return right(userData)
    } else {
      return left(new UserAlredyExistsError(userData.email))
    }
  }
}
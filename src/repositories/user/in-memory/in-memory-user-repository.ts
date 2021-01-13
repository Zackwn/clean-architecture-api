import { UserData } from "../../../entities/user/user-data";
import { Either, left, right } from "../../../shared/either";
import { UserRepository } from "../../../usecases/ports/user-repository";
import { UserAlredyExistsError } from "../../errors/user-alredy-exists";
import { UserDoNotExistsError } from "../../errors/user-do-not-exists";

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
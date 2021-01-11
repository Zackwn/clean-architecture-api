import { UserData } from "../../../entities/user/user-data";
import { Either, left, right } from "../../../shared/either";
import { UserRepository } from "../../../usecases/ports/user-repository";
import { UserAlredyExistsError } from "../../errors/user-alredy-exists";

export class InMemoryUserRepository implements UserRepository {
  private users: UserData[] = []

  public constructor(users: UserData[] = []) {
    this.users = users
  }

  public async findByEmail(email: string): Promise<UserData | undefined> {
    return this.users.find(user => user.email === email)
  }

  public async exists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email)
    if (user) {
      return true
    }
    return false
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
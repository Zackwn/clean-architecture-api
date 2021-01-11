import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { left, right } from "../../shared/either";
import { UserRepository } from "../ports/user-repository";
import { IRegisterUser } from "./register-user-interface";
import { RegisterUserResponse } from "./register-user-response";

export class RegisterUser implements IRegisterUser {
  private readonly userRepository: UserRepository

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async exec(userData: UserData): Promise<RegisterUserResponse> {
    const userOrError = User.create(userData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user: User = userOrError.value

    // use user class object as props
    const savedUserDataOrError = await this.userRepository.save({
      email: user.email.value,
      name: user.name.value
    })

    if (savedUserDataOrError.isLeft()) {
      return left(savedUserDataOrError.value)
    }

    return right(savedUserDataOrError.value)
  }
}
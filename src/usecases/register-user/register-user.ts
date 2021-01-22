import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { left, right } from "../../shared/either";
import { UserPasswordHasher } from "../ports/user-password-hasher";
import { UserRepository } from "../ports/user-repository";
import { IRegisterUser } from "./register-user-interface";
import { RegisterUserResponse } from "./register-user-response";

export class RegisterUser implements IRegisterUser {
  private readonly userRepository: UserRepository
  private readonly userPasswordHasher: UserPasswordHasher

  public constructor(userRepository: UserRepository, userPasswordHasher: UserPasswordHasher) {
    this.userRepository = userRepository
    this.userPasswordHasher = userPasswordHasher
  }

  public async exec(userData: UserData): Promise<RegisterUserResponse> {
    const userOrError = await User.create(userData)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user: User = userOrError.value
    const userPasswordHashed = await this.userPasswordHasher.hash(user.password.value)

    // use user class object as props
    const savedUserDataOrError = await this.userRepository.save({
      email: user.email.value,
      name: user.name.value,
      password: userPasswordHashed,
      id: user.id.value
    })

    if (savedUserDataOrError.isLeft()) {
      return left(savedUserDataOrError.value)
    }

    return right(savedUserDataOrError.value)
  }
}
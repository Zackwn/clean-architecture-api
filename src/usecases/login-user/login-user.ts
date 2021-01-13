import { Password } from "../../entities/user/password";
import { UserData } from "../../entities/user/user-data";
import { left, right } from "../../shared/either";
import { UserAuth, UserAuthPayload } from "../ports/user-auth";
import { UserRepository } from "../ports/user-repository";
import { ILoginUser } from './login-user-interface'
import { LoginUserResponse, LoginUserResponseRight } from "./login-user-response";

export class LoginUser implements ILoginUser {
  private readonly userRepository: UserRepository
  private readonly userAuth: UserAuth

  public constructor(userRepository: UserRepository, userAuth: UserAuth) {
    this.userRepository = userRepository
    this.userAuth = userAuth
  }

  async exec(email: string, password: string): Promise<LoginUserResponse> {
    const userOrError = await this.userRepository.findByEmail(email)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const userData: UserData = userOrError.value

    const hashPassword = userData.password
    const correctPasswordOrError = await Password.verify(password, hashPassword)

    if (correctPasswordOrError.isLeft()) {
      return left(correctPasswordOrError.value)
    }

    const userAuthPayload: UserAuthPayload = {
      email: userData.email
    }

    const token = await this.userAuth.sign(userAuthPayload)

    const loginUserResponseRight: LoginUserResponseRight = {
      token,
      userData
    }

    return right(loginUserResponseRight)
  }
}
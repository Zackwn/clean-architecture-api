import { Password } from "../../entities/user/password";
import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { left, right } from "../../shared/either";
import { UserAuth, UserAuthPayload } from "../ports/user-auth";
import { UserPasswordHasher } from "../ports/user-password-hasher";
import { UserRepository } from "../ports/user-repository";
import { ILoginUser } from './login-user-interface'
import { LoginUserResponse, LoginUserResponseRight } from "./login-user-response";

export class LoginUser implements ILoginUser {
  private readonly userRepository: UserRepository
  private readonly userAuth: UserAuth
  private readonly userPasswordHasher: UserPasswordHasher

  public constructor(userRepository: UserRepository, userAuth: UserAuth, userPasswordHasher: UserPasswordHasher) {
    this.userRepository = userRepository
    this.userAuth = userAuth
    this.userPasswordHasher = userPasswordHasher
  }

  async exec(email: string, password: string): Promise<LoginUserResponse> {
    const userOrError = await this.userRepository.findByEmail(email)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const userData: UserData = userOrError.value

    const hashPassword = userData.password
    const correctPasswordOrError = await this.userPasswordHasher.verify(password, hashPassword)

    if (correctPasswordOrError.isLeft()) {
      return left(correctPasswordOrError.value)
    }

    const userAuthPayload: UserAuthPayload = {
      email: userData.email,
      id: userData.id
    }

    const token = await this.userAuth.sign(userAuthPayload)

    const loginUserResponseRight: LoginUserResponseRight = {
      token,
      userData
    }

    return right(loginUserResponseRight)
  }
}
import { UserPasswordHasherBcryptAdapter } from "../../adapters/password-hasher/bcrypt-adapter/user-password-hasher-bcrypt-adapter"
import { LoginUser } from "../../usecases/login-user/login-user"
import { ILoginUser } from "../../usecases/login-user/login-user-interface"
import userRepository from './in-memory-user-repository'
import { makeUserAuth } from "./user-auth"

export const makeLoginUserUseCase = (): ILoginUser => {
  const userAuth = makeUserAuth()

  const bcryptUserPasswordHasher = new UserPasswordHasherBcryptAdapter()

  const loginUserUseCase = new LoginUser(userRepository, userAuth, bcryptUserPasswordHasher)

  return loginUserUseCase
}
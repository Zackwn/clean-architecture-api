import { UserPasswordHasherBcryptAdapter } from "../../../adapters/password-hasher/bcrypt-adapter/user-password-hasher-bcrypt-adapter"
import { LoginUser } from "../../../usecases/login-user/login-user"
import { ILoginUser } from "../../../usecases/login-user/login-user-interface"
import { makeUserRepository } from '../repositories/user-repository'
import { makeUserAuth } from "../auth/user-auth"

export const makeLoginUserUseCase = (): ILoginUser => {
  const userAuth = makeUserAuth()

  const bcryptUserPasswordHasher = new UserPasswordHasherBcryptAdapter()

  const userRepository = makeUserRepository()

  const loginUserUseCase = new LoginUser(userRepository, userAuth, bcryptUserPasswordHasher)

  return loginUserUseCase
}
import { Controller } from "../../adapters/controllers/controller"
import { RegisterController } from "../../adapters/controllers/register-controller"
import { UserPasswordHasherBcryptAdapter } from "../../adapters/password-hasher/bcrypt-adapter/user-password-hasher-bcrypt-adapter"
import { RegisterUser } from "../../usecases/register-user/register-user"
import { makeUserRepository } from './user-repository'
import { makeLoginUserUseCase } from "./login-user-use-case"

export const makeRegisterController = (): Controller => {
  const bcryptUserPasswordHasher = new UserPasswordHasherBcryptAdapter()

  const loginUserUseCase = makeLoginUserUseCase()
  const registerUserUseCase = new RegisterUser(makeUserRepository(), bcryptUserPasswordHasher)

  const registerController = new RegisterController(registerUserUseCase, loginUserUseCase)

  return registerController
}
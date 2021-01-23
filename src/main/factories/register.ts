import { Controller } from "../../adapters/controllers/controller"
import { RegisterController } from "../../adapters/controllers/register-controller"
import { UserPasswordHasherBcryptAdapter } from "../../adapters/password-hasher/bcrypt-adapter/user-password-hasher-bcrypt-adapter"
import { LoginUser } from "../../usecases/login-user/login-user"
import { RegisterUser } from "../../usecases/register-user/register-user"
import { makeUserAuth } from "./user-auth"

import userRepository from './in-memory-user-repository'

export const makeRegisterController = (): Controller => {
  const userAuth = makeUserAuth()

  const bcryptUserPasswordHasher = new UserPasswordHasherBcryptAdapter()

  const loginUserUseCase = new LoginUser(userRepository, userAuth, bcryptUserPasswordHasher)
  const registerUserUseCase = new RegisterUser(userRepository, bcryptUserPasswordHasher)

  const registerController = new RegisterController(registerUserUseCase, loginUserUseCase)

  return registerController
}
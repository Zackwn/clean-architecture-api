import { Controller } from "../../adapters/controllers/controller"
import { RegisterController } from "../../adapters/controllers/register-controller"
import { InMemoryUserRepository } from "../../repositories/user/in-memory/in-memory-user-repository"
import { LoginUser } from "../../usecases/login-user/login-user"
import { RegisterUser } from "../../usecases/register-user/register-user"
import { makeUserAuth } from "./jwt-user-auth-adapter"

export const makeRegisterController = (): Controller => {
  const userRepository = new InMemoryUserRepository()
  const userAuth = makeUserAuth()

  const loginUserUseCase = new LoginUser(userRepository, userAuth)
  const registerUserUseCase = new RegisterUser(userRepository)

  const registerController = new RegisterController(registerUserUseCase, loginUserUseCase)

  return registerController
}
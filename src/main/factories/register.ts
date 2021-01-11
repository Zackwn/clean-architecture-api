import { Controller } from "../../adapters/controllers/controller"
import { RegisterController } from "../../adapters/controllers/register-controller"
import { InMemoryUserRepository } from "../../repositories/user/in-memory/in-memory-user-repository"
import { RegisterUser } from "../../usecases/register-user/register-user"

export const makeRegisterController = (): Controller => {
  const userRepository = new InMemoryUserRepository()
  const registerUserUseCase = new RegisterUser(userRepository)
  const registerController = new RegisterController(registerUserUseCase)

  return registerController
}
import { JWTUserAuthAdapter } from "../../adapters/auth/jwt-user-auth-adapter"
import { Controller } from "../../adapters/controllers/controller"
import { RegisterController } from "../../adapters/controllers/register-controller"
import { InMemoryUserRepository } from "../../repositories/user/in-memory/in-memory-user-repository"
import { RegisterUser } from "../../usecases/register-user/register-user"
import { LoginUser } from "../../usecases/login-user/login-user"

export const makeRegisterController = (): Controller => {
  const userRepository = new InMemoryUserRepository()
  const jwtUserAuth = new JWTUserAuthAdapter()

  const loginUserUseCase = new LoginUser(userRepository, jwtUserAuth)
  const registerUserUseCase = new RegisterUser(userRepository)

  const registerController = new RegisterController(registerUserUseCase, loginUserUseCase)

  return registerController
}
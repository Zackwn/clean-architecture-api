import { Controller } from "../../../adapters/controllers/controller"
import { LoginController } from "../../../adapters/controllers/login-controller"
import { makeLoginUserUseCase } from "../usecases/login-user-use-case"

export const makeLoginController = (): Controller => {
  const loginUserUseCase = makeLoginUserUseCase()

  const loginController = new LoginController(loginUserUseCase)

  return loginController
}
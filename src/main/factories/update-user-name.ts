import { UpdateUserNameController } from "../../adapters/controllers/update-user-name-controller"
import { WithAuthController } from "../../adapters/controllers/with-auth-controller"
import { UpdateUserName } from "../../usecases/update-user-name/update-user-name"
import { makeUserRepository } from './user-repository'

export const makeUpdateUserName = (): WithAuthController => {
  const updateUserNameUseCase = new UpdateUserName(makeUserRepository())

  const updateUserNameController = new UpdateUserNameController(updateUserNameUseCase)

  return updateUserNameController
}
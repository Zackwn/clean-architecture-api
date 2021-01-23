import { UpdateUserNameController } from "../../adapters/controllers/update-user-name-controller"
import { WithAuthController } from "../../adapters/controllers/with-auth-controller"
import { UpdateUserName } from "../../usecases/update-user-name/update-user-name"
import userRepository from './in-memory-user-repository'

export const makeUpdateUserName = (): WithAuthController => {
  const updateUserNameUseCase = new UpdateUserName(userRepository)

  const updateUserNameController = new UpdateUserNameController(updateUserNameUseCase)

  return updateUserNameController
}
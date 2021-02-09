import { UserBuilder } from "../../entities/user/user-builder"
import { InMemoryUserRepository } from "../../repositories/in-memory/user/in-memory-user-repository"

import { UpdateUserName } from './update-user-name'

describe('Update User Name Use Case', () => {
  it('should update user name', async () => {
    const user = UserBuilder.aUser().build()
    const userRepository = new InMemoryUserRepository([user])
    const updateUserNameUseCase = new UpdateUserName(userRepository)

    const updatedName = 'updatedname'

    await updateUserNameUseCase.exec({
      id: user.id,
      name: updatedName
    })

    expect((await userRepository.findById(user.id)).value).toStrictEqual({ ...user, name: updatedName })
  })
})
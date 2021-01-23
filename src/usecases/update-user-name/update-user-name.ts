import { Name } from '../../entities/user/name';
import { left, right } from '../../shared/either';
import { UserRepository } from '../ports/user-repository';
import { UpdateUserNameDTO } from './update-user-name-dto';
import { IUpdateUserName, UpdateUserNameResponse } from './update-user-name-interface'

export class UpdateUserName implements IUpdateUserName {
  private readonly userRepository: UserRepository

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async exec(updateUserNameParams: UpdateUserNameDTO): Promise<UpdateUserNameResponse> {
    const { id, name } = updateUserNameParams

    const userOrError = await this.userRepository.findById(id)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const nameOrError = Name.create(name)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    const updatedUserDataOrError = await this.userRepository
      .updateUser(id, { name: nameOrError.value.value })

    if (updatedUserDataOrError.isLeft()) {
      return left(updatedUserDataOrError.value)
    }

    return right(updatedUserDataOrError.value)
  }
}
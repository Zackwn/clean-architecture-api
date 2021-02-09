import { MongoDBUserRepository } from './mongodb-user-repository'
import { UserBuilder } from '../../../../entities/user/user-builder'
import { MongoHelper } from '../helpers/mongo-helper'
import { UpdateUserData } from '../../../../usecases/ports/user-repository'
import { UserData } from '../../../../entities/user/user-data'

describe('MongoDB User Repository', () => {
  beforeEach(async () => {
    await MongoHelper.clearCollection('user')
  })

  it('should save user', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new MongoDBUserRepository()

    await userRepository.save(user)

    expect((await userRepository.findByEmail(user.email)).value).toEqual(user)
  })

  it('should return user if user is found', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new MongoDBUserRepository()
    await userRepository.save(user)

    expect((await userRepository.findByEmail(user.email)).value).toMatchObject(user)
  })

  it('should return error if user is not found (findByEmail)', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new MongoDBUserRepository()
    await userRepository.save(user)

    expect((await userRepository.findByEmail('no@mail.com')).isLeft()).toBe(true)
  })

  it(`shouldn't save user that alredy exists`, async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new MongoDBUserRepository()
    await userRepository.save(user)

    const savedUserDataOrError = await userRepository.save(user)

    expect(savedUserDataOrError.isLeft()).toBe(true)
  })

  it('should find user by id', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new MongoDBUserRepository()
    await userRepository.save(user)

    expect((await userRepository.findById(user.id)).value).toEqual(user)
  })

  it('should return error if user is not found (findById)', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new MongoDBUserRepository()
    await userRepository.save(user)

    expect((await userRepository.findById('nonexistingid')).isLeft()).toBe(true)
  })

  it('should update user', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new MongoDBUserRepository()
    await userRepository.save(user)

    const updateUserData: UpdateUserData = {
      name: 'updatedname',
      password: 'updatedpassword'
    }

    await userRepository.updateUser(user.id, updateUserData)

    const foundUser = await userRepository.findById(user.id)

    if (foundUser.isRight()) {
      expect(foundUser.value.name).toBe(updateUserData.name)
      expect(foundUser.value.password).toBe(updateUserData.password)
    }
  })
})
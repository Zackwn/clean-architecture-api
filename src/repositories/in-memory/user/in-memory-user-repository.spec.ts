import { UserBuilder } from '../../../entities/user/user-builder'
import { UpdateUserData } from '../../../usecases/ports/user-repository'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory user repository', () => {
  it('should return user if user is found', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository([user])

    expect((await userRepository.findByEmail(user.email)).value).toBe(user)
  })

  it('should return error if user is not found (findByEmail)', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository([user])

    expect((await userRepository.findByEmail('no@mail.com')).isLeft()).toBe(true)
  })

  it('should save user', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository()

    await userRepository.save(user)

    expect((await userRepository.findByEmail(user.email)).value).toBe(user)
  })

  it(`shouldn't save user that alredy exists`, async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository([user])

    const savedUserDataOrError = await userRepository.save(user)

    expect(savedUserDataOrError.isLeft()).toBe(true)
  })

  it('should find user by id', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository([user])

    expect((await userRepository.findById(user.id)).value).toBe(user)
  })

  it('should return error if user is not found (findById)', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository([user])

    expect((await userRepository.findById('nonexistingid')).isLeft()).toBe(true)
  })

  it('should update user', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository([user])

    const updateUserData: UpdateUserData = {
      name: 'updatedname',
      password: 'updatedpassword'
    }

    await userRepository.updateUser(user.id, updateUserData)

    expect((await userRepository.findById(user.id)).value).toStrictEqual({ ...user, ...updateUserData })
  })
})
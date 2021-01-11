import { UserBuilder } from '../../../entities/user/user-builder'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory user repository', () => {
  it('should return user if user is found', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository([user])

    expect((await userRepository.findByEmail(user.email))).toBe(user)
  })

  it('should return undefined if user is not found', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository([user])

    expect((await userRepository.findByEmail('no@mail.com'))).toBe(undefined)
  })

  it('should save user', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository()

    await userRepository.save(user)

    expect((await userRepository.findByEmail(user.email))).toBe(user)
  })

  it(`shouldn't save user that alredy exists`, async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository([user])

    const savedUserDataOrError = await userRepository.save(user)

    expect(savedUserDataOrError.isLeft()).toBe(true)
  })
})
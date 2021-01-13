import { InMemoryUserRepository } from '../../repositories/user/in-memory/in-memory-user-repository'
import { RegisterUser } from './register-user'
import { UserBuilder } from '../../entities/user/user-builder'

describe('Register User Use Case', () => {
  it('should register user', async () => {
    const userRepo = new InMemoryUserRepository()
    const registerUser = new RegisterUser(userRepo)

    const userData = UserBuilder
      .aUser()
      .build()

    const registeredUser = await registerUser.exec(userData)

    expect((await userRepo.findByEmail(userData.email)).value).toBe(registeredUser.value)
  })
})
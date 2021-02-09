import { InMemoryUserRepository } from '../../repositories/in-memory/user/in-memory-user-repository'
import { RegisterUser } from './register-user'
import { UserBuilder } from '../../entities/user/user-builder'
import { UserPasswordHasherBcryptAdapter } from '../../adapters/password-hasher/bcrypt-adapter/user-password-hasher-bcrypt-adapter'

describe('Register User Use Case', () => {
  it('should register user', async () => {
    const userRepo = new InMemoryUserRepository()
    const userPasswordHasher = new UserPasswordHasherBcryptAdapter()
    const registerUser = new RegisterUser(userRepo, userPasswordHasher)

    const userData = UserBuilder
      .aUser()
      .build()

    const registeredUser = await registerUser.exec(userData)

    expect((await userRepo.findByEmail(userData.email)).value).toBe(registeredUser.value)
  })
})
import { JWTUserAuthAdapter } from '../../adapters/auth/jwt-user-auth-adapter'
import { UserPasswordHasherBcryptAdapter } from '../../adapters/password-hasher/bcrypt-adapter/user-password-hasher-bcrypt-adapter'
import { User } from '../../entities/user/user'
import { UserBuilder } from '../../entities/user/user-builder'
import { UserData } from '../../entities/user/user-data'
import { InMemoryUserRepository } from '../../repositories/user/in-memory/in-memory-user-repository'
import { LoginUser } from './login-user'

describe('Login User Use Case', () => {
  it('should login a user', async () => {
    const userRepo = new InMemoryUserRepository()
    const jwtAuthUser = new JWTUserAuthAdapter()
    const userPasswordHasher = new UserPasswordHasherBcryptAdapter()
    const loginUser = new LoginUser(userRepo, jwtAuthUser, userPasswordHasher)

    const userData: UserData = UserBuilder.aUser().build()

    const userOrError = await User.create(userData)

    const user: User = userOrError.value as User

    await userRepo.save({
      name: user.name.value,
      email: user.email.value,
      password: await userPasswordHasher.hash(user.password.value),
      id: user.id.value
    })

    const loginUserResponseOrError = await loginUser.exec(userData.email, user.password.value)

    expect(loginUserResponseOrError.isRight()).toBe(true)
  })

  it('should not login user with wrong password', async () => {
    const userRepo = new InMemoryUserRepository()
    const jwtAuthUser = new JWTUserAuthAdapter()
    const userPasswordHasher = new UserPasswordHasherBcryptAdapter()
    const loginUser = new LoginUser(userRepo, jwtAuthUser, userPasswordHasher)

    const userData: UserData = UserBuilder.aUser().build()

    await userRepo.save(userData)

    const loginUserResponseOrError = await loginUser.exec(userData.email, 'wrongpassword')

    expect(loginUserResponseOrError.isLeft()).toBe(true)
  })
}) 
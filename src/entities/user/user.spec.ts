import { User } from '../user/user'
import { UserBuilder } from '../user/user-builder'
import { Password } from './password'

describe('User domain entity', () => {
  it('should not create user with invalid name', async () => {
    const userData = UserBuilder
      .aUser()
      .withInvalidName()
      .build()

    const userOrError = await User.create(userData)
    expect(userOrError.isLeft()).toBe(true)
  })

  it('should not create user with invalid email', async () => {
    const userData = UserBuilder
      .aUser()
      .withInvalidEmail()
      .build()

    const userOrError = await User.create(userData)
    expect(userOrError.isLeft()).toBe(true)
  })

  it('should not create user with invalid password', async () => {
    const userData = UserBuilder
      .aUser()
      .withInvalidPassword()
      .build()

    const userOrError = await User.create(userData)

    expect(userOrError.isLeft()).toBe(true)
  })

  it('should generate id', async () => {
    const userData = UserBuilder
      .aUser()
      .build()

    const userOrError = await User.create(userData)

    const user: User = userOrError.value as User

    expect(user.id.value.length).toBeGreaterThan(0)
  })
})
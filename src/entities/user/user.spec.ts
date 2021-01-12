import { User } from '../user/user'
import { UserBuilder } from '../user/user-builder'

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

  it('should encrypt password', async () => {
    const userData = UserBuilder
      .aUser()
      .build()

    const userOrError = await User.create(userData)

    let userPassword = ''
    if (userOrError.isRight()) {
      userPassword = userOrError.value.password.value
    }

    expect(userData.password.length).toBeLessThan(userPassword.length)
  })
})
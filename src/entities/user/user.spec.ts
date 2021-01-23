import { User } from '../user/user'
import { UserBuilder } from '../user/user-builder'

describe('User domain entity', () => {
  it('should not create user with invalid name', () => {
    const userData = UserBuilder
      .aUser()
      .withInvalidName()
      .build()

    const userOrError = User.create(userData)
    expect(userOrError.isLeft()).toBe(true)
  })

  it('should not create user with invalid email', () => {
    const userData = UserBuilder
      .aUser()
      .withInvalidEmail()
      .build()

    const userOrError = User.create(userData)
    expect(userOrError.isLeft()).toBe(true)
  })

  it('should not create user with invalid password', () => {
    const userData = UserBuilder
      .aUser()
      .withInvalidPassword()
      .build()

    const userOrError = User.create(userData)

    expect(userOrError.isLeft()).toBe(true)
  })

  it('should generate id', () => {
    const userData = UserBuilder
      .aUser()
      .build()

    const userOrError = User.create(userData)

    const user: User = userOrError.value as User

    expect(user.id.value.length).toBeGreaterThan(0)
  })
})
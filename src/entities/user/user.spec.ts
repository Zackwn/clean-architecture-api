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

  it('should hash password', async () => {
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

  it('should verify right password', async () => {
    const userData = UserBuilder
      .aUser()
      .build()

    const userOrError = await User.create(userData)

    let hashedPassword = ''
    if (userOrError.isRight()) {
      hashedPassword = userOrError.value.password.value
    }

    const rightPasswordOrError = await User.verify(userData.password, hashedPassword)

    expect(rightPasswordOrError.value).toBe(userData.password)
  })

  it('should not verify wrong password', async () => {
    const userData = UserBuilder
      .aUser()
      .build()

    const userOrError = await User.create(userData)

    let hashedPassword = ''
    if (userOrError.isRight()) {
      hashedPassword = userOrError.value.password.value
    }

    const rightPasswordOrError = await User.verify('wrongpassword', hashedPassword)

    expect(rightPasswordOrError.isLeft()).toBe(true)
  })
})
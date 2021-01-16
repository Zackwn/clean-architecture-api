import { UserPasswordHasherBcryptAdapter } from './user-password-hasher-bcrypt-adapter'

describe('', () => {
  it('should hash password', async () => {
    const passwordHasher = new UserPasswordHasherBcryptAdapter()

    const password = 'password'
    expect((await passwordHasher.hash(password)).length).toBeGreaterThan(password.length)
  })

  it('should verify right password', async () => {
    const passwordHasher = new UserPasswordHasherBcryptAdapter()

    const password = 'password'

    let hashedPassword = await passwordHasher.hash(password)

    const rightPasswordOrError = await passwordHasher.verify(password, hashedPassword)

    expect(rightPasswordOrError.value).toBe(password)
  })

  it('should not verify wrong password', async () => {
    const passwordHasher = new UserPasswordHasherBcryptAdapter()

    const password = 'password'

    let hashedPassword = await passwordHasher.hash(password)

    const rightPasswordOrError = await passwordHasher.verify('wrongpassword', hashedPassword)

    expect(rightPasswordOrError.isLeft()).toBe(true)
  })
})
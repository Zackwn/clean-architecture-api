import { JWTUserAuthAdapter } from './jwt-user-auth-adapter'
import jwt from 'jsonwebtoken'
import { UserAuthPayload } from '../../usecases/ports/user-auth'

describe('JWT User Auth Adapter', () => {
  it('should sign payload', async () => {
    const jwtUserAuth = new JWTUserAuthAdapter()

    const payload: UserAuthPayload = { email: 'any@mail.com', id: '679c9561-d768-4140-9f32-585e9cf4ce85' }

    const token = await jwtUserAuth.sign(payload)

    expect((jwt.decode(token) as UserAuthPayload).email).toBe(payload.email)
  })

  it('should sign and verify payload', async () => {
    const jwtUserAuth = new JWTUserAuthAdapter()

    const payload: UserAuthPayload = { email: 'any@mail.com', id: '679c9561-d768-4140-9f32-585e9cf4ce85' }

    const token = await jwtUserAuth.sign(payload)

    const verifyDecodedPayloadOrError = await jwtUserAuth.decode(token)

    const verifyDecodedPayload = verifyDecodedPayloadOrError.value as UserAuthPayload

    expect(verifyDecodedPayload.email).toBe(payload.email)
  })

  it('should fail to decoda not own generated token', async () => {
    const jwtUserAuth = new JWTUserAuthAdapter()

    const payload: UserAuthPayload = { email: 'any@mail.com', id: '679c9561-d768-4140-9f32-585e9cf4ce85' }

    const token = jwt.sign(payload, 'false_secret')

    expect((await jwtUserAuth.decode(token)).isLeft()).toBe(true)
  })
})
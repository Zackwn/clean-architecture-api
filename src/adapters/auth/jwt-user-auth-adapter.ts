import { UserAuth, UserAuthPayload } from '../../usecases/ports/user-auth'
import { sign, verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import { InvalidTokenError } from './errors/invalid-token'
import { Either, left, right } from '../../shared/either'

config()

if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET.')
}

export class JWTUserAuthAdapter implements UserAuth {
  private readonly JWT_SECRET: string = String(process.env.JWT_SECRET)

  public async sign(payload: UserAuthPayload): Promise<string> {
    return sign(payload, this.JWT_SECRET, {
      expiresIn: '30m'
    })
  }

  public async decode(token: string): Promise<Either<InvalidTokenError, UserAuthPayload>> {
    try {
      return right(verify(token, this.JWT_SECRET) as UserAuthPayload)
    } catch (error) {
      return left(new InvalidTokenError())
    }
  }
}
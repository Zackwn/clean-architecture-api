import { UserAuth, UserAuthPayload } from '../../usecases/ports/user-auth'
import { sign, verify } from 'jsonwebtoken'
import { config } from 'dotenv'
import { InvalidTokenError } from './errors/invalid-token'
import { Either, left, right } from '../../shared/either'

config()

export class JWTUserAuthAdapter implements UserAuth {
  public async sign(payload: UserAuthPayload): Promise<string> {
    return sign(payload, process.env.JWT_SECRET)
  }

  public async decode(token: string): Promise<Either<InvalidTokenError, UserAuthPayload>> {
    try {
      return right(verify(token, process.env.JWT_SECRET) as UserAuthPayload)
    } catch (error) {
      return left(new InvalidTokenError())
    }
  }
}
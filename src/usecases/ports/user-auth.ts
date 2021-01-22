import { InvalidTokenError } from "../../adapters/auth/errors/invalid-token";
import { Either } from "../../shared/either";

export interface UserAuthPayload {
  email: string
  id: string
}

export interface UserAuth {
  sign(payload: UserAuthPayload): Promise<string>
  decode(token: string): Promise<Either<InvalidTokenError, UserAuthPayload>>
}
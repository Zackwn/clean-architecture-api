import { WrongPasswordError } from "../../adapters/password-hasher/errors/wrong-password";
import { Either } from "../../shared/either";

export interface UserPasswordHasher {
  hash(password: string): Promise<string>
  verify(password: string, hash: string): Promise<Either<WrongPasswordError, string>>
}
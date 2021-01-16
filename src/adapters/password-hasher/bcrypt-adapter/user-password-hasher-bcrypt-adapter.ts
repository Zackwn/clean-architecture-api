import { hash, compare } from "bcrypt";
import { Either, right, left } from "../../../shared/either";
import { UserPasswordHasher } from "../../../usecases/ports/user-password-hasher";
import { WrongPasswordError } from "../errors/wrong-password";

export class UserPasswordHasherBcryptAdapter implements UserPasswordHasher {
  public async hash(password: string): Promise<string> {
    const encryptedPassword = await hash(password, 8)
    return encryptedPassword
  }

  public async verify(password: string, hash: string): Promise<Either<WrongPasswordError, string>> {
    const isPasswordCorrect = await compare(password, hash)
    if (isPasswordCorrect) {
      return right(password)
    }
    return left(new WrongPasswordError(password))
  }
}
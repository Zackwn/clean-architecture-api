import { UserData } from "../../entities/user/user-data";
import { UserAlredyExistsError } from "../../repositories/errors/user-alredy-exists";
import { UserDoNotExistsError } from "../../repositories/errors/user-do-not-exists";
import { Either } from "../../shared/either";

export interface UserRepository {
  save(user: UserData): Promise<Either<UserAlredyExistsError, UserData>>
  findByEmail(email: string): Promise<Either<UserDoNotExistsError, UserData>>
  exists(email: string): Promise<boolean>
}
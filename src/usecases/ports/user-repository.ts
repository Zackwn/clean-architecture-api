import { UserData } from "../../entities/user/user-data";
import { UserAlredyExistsError } from "../../repositories/errors/user-alredy-exists";
import { Either } from "../../shared/either";

export interface UserRepository {
  save(user: UserData): Promise<Either<UserAlredyExistsError, UserData>>
  findByEmail(email: string): Promise<UserData | undefined>
  exists(email: string): Promise<boolean>
}
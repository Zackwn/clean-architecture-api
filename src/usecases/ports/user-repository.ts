import { UserData } from "../../entities/user/user-data";
import { UserAlredyExistsError } from "../../repositories/errors/user-alredy-exists";
import { UserDoNotExistsError } from "../../repositories/errors/user-do-not-exists";
import { Either } from "../../shared/either";

export interface UpdateUserData {
  name?: string,
  password?: string
}

export interface UserRepository {
  save(user: UserData): Promise<Either<UserAlredyExistsError, UserData>>
  findByEmail(email: string): Promise<Either<UserDoNotExistsError, UserData>>
  findById(id: string): Promise<Either<UserDoNotExistsError, UserData>>
  exists(email: string): Promise<boolean>,
  updateUser(id: string, user: UpdateUserData): Promise<Either<UserDoNotExistsError, UserData>>
}
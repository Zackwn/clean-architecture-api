import { UserData } from "../../entities/user/user-data";
import { UserAlredyExistsError } from "../../repositories/errors/user/user-alredy-exists";
import { UserDoNotExistsError } from "../../repositories/errors/user/user-do-not-exists";
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
  updateUser(id: string, updatedUserData: UpdateUserData): Promise<Either<UserDoNotExistsError, UserData>>
}
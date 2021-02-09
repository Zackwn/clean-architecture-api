import { InvalidNameError } from "../../entities/user/errors/invalid-name";
import { UserData } from "../../entities/user/user-data";
import { UserDoNotExistsError } from "../../repositories/errors/user/user-do-not-exists";
import { Either } from "../../shared/either";
import { UpdateUserNameDTO } from "./update-user-name-dto";

export type UpdateUserNameResponse = Either<UserDoNotExistsError | InvalidNameError, UserData>

export interface IUpdateUserName {
  exec(updateUserNameParams: UpdateUserNameDTO): Promise<UpdateUserNameResponse>
}
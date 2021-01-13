import { UserData } from "../../entities/user/user-data";
import { UserDoNotExistsError } from "../../repositories/errors/user-do-not-exists";
import { Either } from "../../shared/either";

export interface LoginUserResponseRight {
  token: string,
  userData: UserData
}

export type LoginUserResponse = Either<UserDoNotExistsError, LoginUserResponseRight>
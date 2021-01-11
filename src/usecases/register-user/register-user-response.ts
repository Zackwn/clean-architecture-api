import { InvalidEmailError } from "../../entities/user/errors/invalid-email";
import { InvalidNameError } from "../../entities/user/errors/invalid-name";
import { UserData } from "../../entities/user/user-data";
import { Either } from "../../shared/either";

export type RegisterUserResponse = Either<InvalidEmailError | InvalidNameError, UserData>
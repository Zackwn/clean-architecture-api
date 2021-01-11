import { User } from "../../entities/user/user";
import { UserData } from "../../entities/user/user-data";
import { RegisterUserResponse } from "./register-user-response";

export interface IRegisterUser {
  exec(userData: UserData): Promise<RegisterUserResponse>
}
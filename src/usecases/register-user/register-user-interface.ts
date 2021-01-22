import { RegisterUserDTO } from "./register-user-dto";
import { RegisterUserResponse } from "./register-user-response";

export interface IRegisterUser {
  exec(userData: RegisterUserDTO): Promise<RegisterUserResponse>
}
import { UserData } from "../../entities/user/user-data";
import { LoginUserResponse } from "./login-user-response";

export interface ILoginUser {
  exec(email: string, password: string): Promise<LoginUserResponse>
}
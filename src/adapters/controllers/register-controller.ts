import { UserData } from "../../entities/user/user-data";
import { IRegisterUser } from "../../usecases/register-user/register-user-interface";
import { RegisterUserResponse } from "../../usecases/register-user/register-user-response";
import { Controller } from "./controller";
import { MissingParamError } from "./errors/missing-param-error";
import { badRequest, ok } from "./helpers/http-helper";
import { HttpRequest, HttpResponse } from "./ports/http";

export class RegisterController implements Controller {
  private readonly registerUser: IRegisterUser

  public constructor(registerUser: IRegisterUser) {
    this.registerUser = registerUser
  }

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.email) {
      return badRequest(new MissingParamError("email"))
    }
    if (!request.body.name) {
      return badRequest(new MissingParamError("name"))
    }
    if (!request.body.password) {
      return badRequest(new MissingParamError("password"))
    }
    const userData: UserData = {
      email: request.body.email,
      name: request.body.name,
      password: request.body.password
    }
    const registerUserResponse: RegisterUserResponse = await this.registerUser.exec(userData)
    if (registerUserResponse.isLeft()) {
      return badRequest(registerUserResponse.value)
    }
    return ok(registerUserResponse.value)
  }
}
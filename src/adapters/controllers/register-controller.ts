import { UserData } from "../../entities/user/user-data";
import { ILoginUser } from "../../usecases/login-user/login-user-interface";
import { RegisterUserDTO } from "../../usecases/register-user/register-user-dto";
import { IRegisterUser } from "../../usecases/register-user/register-user-interface";
import { RegisterUserResponse } from "../../usecases/register-user/register-user-response";
import { Controller } from "./controller";
import { MissingParamError } from "./errors/missing-param-error";
import { badRequest, ok } from "./helpers/http-helper";
import { HttpRequest, HttpResponse } from "./ports/http";

export class RegisterController implements Controller {
  private readonly registerUser: IRegisterUser
  private readonly loginUser: ILoginUser

  public constructor(registerUser: IRegisterUser, loginUser: ILoginUser) {
    this.registerUser = registerUser
    this.loginUser = loginUser
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

    const userData: RegisterUserDTO = {
      email: request.body.email,
      name: request.body.name,
      password: request.body.password
    }

    const registerUserResponse: RegisterUserResponse = await this.registerUser.exec(userData)
    if (registerUserResponse.isLeft()) {
      return badRequest(registerUserResponse.value)
    }

    const registeredUserData: UserData = registerUserResponse.value

    const unhashedPassword = userData.password
    const loginUserResponseOrError = await this.loginUser.exec(registeredUserData.email, unhashedPassword)

    if (loginUserResponseOrError.isLeft()) {
      return badRequest(loginUserResponseOrError.value)
    }

    const token = loginUserResponseOrError.value.token

    return ok({
      token,
      user: loginUserResponseOrError.value.userData
    })
  }
}
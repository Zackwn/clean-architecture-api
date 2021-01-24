import { ILoginUser } from "../../usecases/login-user/login-user-interface";
import { Controller } from "./controller";
import { MissingParamError } from "./errors/missing-param-error";
import { badRequest, ok } from "./helpers/http-helper";
import { HttpRequest, HttpResponse } from "./ports/http";

export class LoginController implements Controller {
  private readonly loginUser: ILoginUser

  public constructor(loginUser: ILoginUser) {
    this.loginUser = loginUser
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    if (!request.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    if (!request.body.password) {
      return badRequest(new MissingParamError('password'))
    }

    const email: string = request.body.email
    const password: string = request.body.password

    const loginUserResponseOrError = await this.loginUser.exec(email, password)
    if (loginUserResponseOrError.isLeft()) {
      return badRequest(loginUserResponseOrError.value)
    }

    const loginUserResponse = loginUserResponseOrError.value

    return ok(loginUserResponse)
  }
}
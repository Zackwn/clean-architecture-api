import { UpdateUserData } from "../../usecases/ports/user-repository";
import { IUpdateUserName } from "../../usecases/update-user-name/update-user-name-interface";
import { MissingParamError } from "./errors/missing-param-error";
import { badRequest, ok } from "./helpers/http-helper";
import { WithAuthParams } from "./ports/auth";
import { HttpRequest, HttpResponse } from "./ports/http";
import { WithAuthController } from "./with-auth-controller";

export class UpdateUserNameController implements WithAuthController {
  private readonly updateUserName: IUpdateUserName

  public constructor(updateUserName: IUpdateUserName) {
    this.updateUserName = updateUserName
  }

  async handle(request: HttpRequest, auth: WithAuthParams): Promise<HttpResponse> {
    if (!request.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    const id: string = auth.payload.id
    const name: string = request.body.name

    const updatedUserDataOrError = await this.updateUserName.exec({
      id,
      name
    })

    if (updatedUserDataOrError.isLeft()) {
      return badRequest(updatedUserDataOrError.value)
    }

    const updatedUserData: UpdateUserData = updatedUserDataOrError.value

    return ok(updatedUserData)
  }
}
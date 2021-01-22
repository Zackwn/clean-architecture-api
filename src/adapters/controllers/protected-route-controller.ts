import { ok } from "./helpers/http-helper";
import { WithAuthParams } from "./ports/auth";
import { HttpRequest, HttpResponse } from "./ports/http";
import { WithAuthController } from "./with-auth-controller";

export class ProtectedRouteController implements WithAuthController {
  async handle(_: HttpRequest, auth: WithAuthParams): Promise<HttpResponse> {
    return ok(auth.payload)
  }
}
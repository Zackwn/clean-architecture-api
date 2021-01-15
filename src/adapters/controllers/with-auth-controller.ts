import { WithAuthParams } from "./ports/auth";
import { HttpRequest, HttpResponse } from "./ports/http";

export interface WithAuthController {
  handle(request: HttpRequest, auth: WithAuthParams): Promise<HttpResponse>
}
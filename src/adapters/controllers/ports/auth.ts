import { UserAuthPayload } from "../../../usecases/ports/user-auth";

export interface WithAuthParams {
  payload: UserAuthPayload,
  token: string
}
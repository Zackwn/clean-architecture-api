import { JWTUserAuthAdapter } from "../../adapters/auth/jwt-user-auth-adapter"

export const makeUserAuth = (): JWTUserAuthAdapter => {
  const jwtUserAuth = new JWTUserAuthAdapter()

  return jwtUserAuth
}
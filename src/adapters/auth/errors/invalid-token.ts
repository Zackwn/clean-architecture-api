import { AuthError } from "./auth-error";

export class InvalidTokenError extends Error implements AuthError {
  public constructor() {
    super(`Invalid token was provided.`)
    this.name = 'InvalidTokenError'
  }
}
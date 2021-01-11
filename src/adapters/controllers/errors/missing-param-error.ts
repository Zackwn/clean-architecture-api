import { ControllerError } from "./controller-error"

export class MissingParamError extends Error implements ControllerError {
  public constructor(param: string) {
    super(`The param "${param}" is missing.`)
    this.name = 'MissingParamError'
  }
}
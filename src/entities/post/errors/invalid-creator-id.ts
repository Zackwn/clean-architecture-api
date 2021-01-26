import { PostDomainError } from "./post-domain-error";

export class InvalidCreatorIDError extends Error implements PostDomainError {
  public constructor(creatorID: string) {
    super(`The creator id "${creatorID}" is invalid.`)
  }
}
import { PostDomainError } from "./post-domain-error";

export class InvalidTitleError extends Error implements PostDomainError {
  public constructor(title: string) {
    super(`The title "${title}" is invalid.`)
    this.name = 'InvalidTitleError'
  }
}
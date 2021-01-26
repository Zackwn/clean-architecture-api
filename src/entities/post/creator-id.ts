import { Either, left, right } from "../../shared/either"
import { InvalidCreatorIDError } from "./errors/invalid-creator-id"

export class CreatorID {
  private readonly creatorID: string

  get value(): string {
    return this.creatorID
  }

  private constructor(creatorID: string) {
    this.creatorID = creatorID
  }

  static create(creatorID: string): Either<InvalidCreatorIDError, CreatorID> {
    if (!CreatorID.validate(creatorID)) {
      return left(new InvalidCreatorIDError(creatorID))
    }
    return right(new CreatorID(creatorID))
  }

  static validate(creatorID: string): boolean {
    if (creatorID.length <= 0) {
      return false
    }

    return true
  }
}
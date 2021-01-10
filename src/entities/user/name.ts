import { Either, left, right } from "../../shared/either"
import { InvalidNameError } from "./errors/invalid-name"

export class Name {
  private readonly name: string

  get value(): string {
    return this.name
  }

  private constructor(name: string) {
    this.name = name
    Object.freeze(this)
  }

  static validate(name: string) {
    if (name.includes('@')) {
      return false
    }

    if (name.length >= 30) {
      return false
    }

    return true
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (!Name.validate(name)) {
      return left(new InvalidNameError(name))
    }
    return right(new Name(name))
  }
}
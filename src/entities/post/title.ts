import { Either, left, right } from "../../shared/either"
import { InvalidTitleError } from "./errors/invalid-title"

export class Title {
  private readonly title: string

  get value(): string {
    return this.title
  }

  private constructor(title: string) {
    this.title = title
  }

  static create(title: string): Either<InvalidTitleError, Title> {
    if (!Title.validate(title)) {
      return left(new InvalidTitleError(title))
    }
    return right(new Title(title))
  }

  static validate(title: string): boolean {
    if (title.length <= 0) {
      return false
    }

    if (title.length >= 40) {
      return false
    }

    if (title === title.toUpperCase()) {
      return false
    }

    return true
  }
}
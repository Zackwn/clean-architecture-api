import { Either, left, right } from "../../shared/either"
import { CreatorID } from "./creator-id"
import { InvalidCreatorIDError } from "./errors/invalid-creator-id"
import { PostData } from "./post-data"
import { Title } from "./title"

export class Post {
  public readonly creatorID: CreatorID
  public readonly title: Title

  private constructor(creatorID: CreatorID, title: Title) {
    this.creatorID = creatorID
    this.title = title
  }

  static create(postData: PostData): Either<InvalidCreatorIDError, Post> {
    const creatorIDOrError = CreatorID.create(postData.creatorID)
    const titleOrError = Title.create(postData.title)

    if (creatorIDOrError.isLeft()) {
      return left(creatorIDOrError.value)
    }
    if (titleOrError.isLeft()) {
      return left(titleOrError.value)
    }

    const creatorID: CreatorID = creatorIDOrError.value
    const title: Title = titleOrError.value

    return right(new Post(creatorID, title))
  }
}
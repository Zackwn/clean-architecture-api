import { InvalidCreatorIDError } from "../../entities/post/errors/invalid-creator-id";
import { InvalidTitleError } from "../../entities/post/errors/invalid-title";
import { PostData } from "../../entities/post/post-data";
import { Either } from "../../shared/either";
import { CreatePostDTO } from "./create-post-dto";

export type CreatePostResponse = Either<InvalidCreatorIDError | InvalidTitleError, PostData>

export interface ICreatePost {
  exec(createPostDTO: CreatePostDTO): Promise<CreatePostResponse>
}
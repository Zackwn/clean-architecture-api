import { Post } from "../../entities/post/post";
import { PostData } from "../../entities/post/post-data";
import { UserData } from "../../entities/user/user-data";
import { left, right } from "../../shared/either";
import { PostRepository } from "../ports/post-repository";
import { UserRepository } from "../ports/user-repository";
import { CreatePostDTO } from "./create-post-dto";
import { CreatePostResponse, ICreatePost } from "./create-post-interface";

export class CreatePost implements ICreatePost {
  private readonly postRepository: PostRepository
  private readonly userRepository: UserRepository

  public constructor(postRepository: PostRepository, userRepository: UserRepository) {
    this.postRepository = postRepository
    this.userRepository = userRepository
  }

  async exec(createPostDTO: CreatePostDTO): Promise<CreatePostResponse> {
    const creatorOrError = await this.userRepository.findById(createPostDTO.creatorID)
    if (creatorOrError.isLeft()) {
      return left(creatorOrError.value)
    }

    const creator: UserData = creatorOrError.value

    const postData: PostData = {
      creatorID: creator.id,
      title: createPostDTO.title
    }

    const postOrError = Post.create(postData)
    if (postOrError.isLeft()) {
      return left(postOrError.value)
    }

    const post: Post = postOrError.value

    const savedPostData = await this.postRepository.save({
      creatorID: post.creatorID.value,
      title: post.title.value
    })

    return right(savedPostData)
  }
}
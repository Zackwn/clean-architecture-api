import { PostData } from "../../entities/post/post-data";
import { CreatePostDTO } from "../../usecases/create-post/create-post-dto";
import { ICreatePost } from "../../usecases/create-post/create-post-interface";
import { MissingParamError } from "./errors/missing-param-error";
import { badRequest, ok } from "./helpers/http-helper";
import { WithAuthParams } from "./ports/auth";
import { HttpRequest, HttpResponse } from "./ports/http";
import { WithAuthController } from "./with-auth-controller";

export class CreatePostController implements WithAuthController {
  private readonly createPost: ICreatePost

  public constructor(createPost: ICreatePost) {
    this.createPost = createPost
  }

  async handle(request: HttpRequest, auth: WithAuthParams): Promise<HttpResponse> {
    if (!request.body.title) {
      return badRequest(new MissingParamError('title'))
    }

    const createPostDTO: CreatePostDTO = {
      creatorID: auth.payload.id,
      title: request.body.title
    }

    const createPostResponseOrError = await this.createPost.exec(createPostDTO)

    if (createPostResponseOrError.isLeft()) {
      return badRequest(createPostResponseOrError.value)
    }

    const createdPostData: PostData = createPostResponseOrError.value

    return ok({ post: createdPostData })
  }
}
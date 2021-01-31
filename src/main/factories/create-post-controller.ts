import { CreatePostController } from "../../adapters/controllers/create-post-controller"
import { makeCreatePostUseCase } from "./create-post-use-case"

export const makeCreatePostController = (): CreatePostController => {
  const createPostUseCase = makeCreatePostUseCase()

  const createPostController = new CreatePostController(createPostUseCase)

  return createPostController
}

export default makeCreatePostController()
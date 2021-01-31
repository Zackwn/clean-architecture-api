import { ICreatePost } from "../../usecases/create-post/create-post-interface"
import userRepository from './in-memory-user-repository'
import postRepository from './in-memory-post-repository'
import { CreatePost } from "../../usecases/create-post/create-post"

export const makeCreatePostUseCase = (): ICreatePost => {
  const createPost = new CreatePost(postRepository, userRepository)
  return createPost
}

export default makeCreatePostUseCase()
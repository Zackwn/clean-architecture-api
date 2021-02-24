import { ICreatePost } from "../../../usecases/create-post/create-post-interface"
import { makeUserRepository } from '../repositories/user-repository'
import { makePostRepository } from '../repositories/post-repository'
import { CreatePost } from "../../../usecases/create-post/create-post"

export const makeCreatePostUseCase = (): ICreatePost => {
  const createPost = new CreatePost(makePostRepository(), makeUserRepository())
  return createPost
}

export default makeCreatePostUseCase()
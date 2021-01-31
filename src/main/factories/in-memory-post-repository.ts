import { InMemoryPostRepository } from "../../repositories/post/in-memory/in-memory-post-respository"
import { PostRepository } from "../../usecases/ports/post-repository"

export const makeInMemoryPostRepository = (): PostRepository => {
  const postRepository = new InMemoryPostRepository()

  return postRepository
}

export default makeInMemoryPostRepository()
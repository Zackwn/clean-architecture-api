import { InMemoryPostRepository } from "../../repositories/post/in-memory/in-memory-post-respository"
import { UserBuilder } from '../../entities/user/user-builder'
import { InMemoryUserRepository } from '../../repositories/user/in-memory/in-memory-user-repository'
import { CreatePost } from './create-post'

describe('Create Post Use Case', () => {
  it('should create post', async () => {
    const user = UserBuilder.aUser().build()

    const userRepository = new InMemoryUserRepository([user])
    const postRepository = new InMemoryPostRepository()

    const createPostUseCase = new CreatePost(postRepository, userRepository)

    await createPostUseCase.exec({
      creatorID: user.id,
      title: 'Post Title'
    })

    expect(await postRepository.findAllFromCreator(user.id)).toHaveLength(1)
  })
})
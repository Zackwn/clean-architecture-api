import { InMemoryPostRepository } from './in-memory-post-respository'
import { PostBuilder } from '../../../entities/post/post-builder'

describe('In memory post repository', () => {
  it('should save post', async () => {
    const postRepository = new InMemoryPostRepository()

    const post = PostBuilder.aPost().build()

    await postRepository.save(post)

    expect((await postRepository.findAllFromCreator(post.creatorID))[0]).toBe(post)
  })
})
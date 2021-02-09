import { MongoHelper } from '../helpers/mongo-helper'
import { PostBuilder } from '../../../../entities/post/post-builder'
import { MongoDBPostRepository } from './mongodb-post-repository'

describe('MongoDB Post Repository', () => {
  beforeEach(async () => {
    await MongoHelper.clearCollection('post')
  })

  it('should save and find all post from creator by creatorID', async () => {
    const post = PostBuilder.aPost().build()

    const postRepository = new MongoDBPostRepository()

    await postRepository.save(post)

    const postsFromCreator = await postRepository.findAllFromCreator(post.creatorID)

    expect(postsFromCreator[0]?.creatorID).toBe(post.creatorID)
  })
})
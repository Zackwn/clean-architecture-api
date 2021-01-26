import { PostBuilder } from './post-builder'
import { Post } from './post'

describe('Post Domain Entity', () => {
  it('should create a post', () => {
    const postData = PostBuilder.aPost().build()

    const postOrError = Post.create(postData)

    expect(postOrError.isRight()).toBe(true)
  })

  it('should not create post with invalid creator id', () => {
    const postData = PostBuilder
      .aPost()
      .withInvalidCreatorID()
      .build()

    const postOrError = Post.create(postData)

    expect(postOrError.isLeft()).toBe(true)
  })

  it('should not create post with invalid title', () => {
    const postData = PostBuilder
      .aPost()
      .withInvalidTitle()
      .build()

    const postOrError = Post.create(postData)

    expect(postOrError.isLeft()).toBe(true)
  })
})
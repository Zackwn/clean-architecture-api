import { PostData } from '../../../entities/post/post-data';
import { PostRepository } from '../../../usecases/ports/post-repository'

export class InMemoryPostRepository implements PostRepository {
  private readonly posts: PostData[]

  public constructor(posts: PostData[] = []) {
    this.posts = posts
  }

  async save(postData: PostData): Promise<PostData> {
    this.posts.push(postData)
    return postData
  }

  async findAllFromCreator(creatorID: string): Promise<PostData[]> {
    return this.posts.filter(post => post.creatorID === creatorID)
  }
}
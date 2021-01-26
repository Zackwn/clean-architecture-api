import { PostData } from "./post-data";

export class PostBuilder {
  private post: PostData = {
    creatorID: 'dc6f4a90-ded3-470b-bdb5-14b452ebc868',
    title: 'Post Title'
  }

  static aPost(): PostBuilder {
    return new PostBuilder()
  }

  public withInvalidCreatorID(): PostBuilder {
    this.post.creatorID = ''

    return this
  }

  public withInvalidTitle(): PostBuilder {
    this.post.title = 'INVALID TITLE'

    return this
  }

  public build(): PostData {
    return this.post
  }

  private constructor() { }
}
import { PostData } from "../../../../entities/post/post-data";
import { PostRepository } from "../../../../usecases/ports/post-repository";
import { MongoHelper } from "../helpers/mongo-helper";

export class MongoDBPostRepository implements PostRepository {
  public constructor() { }

  public async findAllFromCreator(creatorID: string): Promise<PostData[]> {
    const postCollection = MongoHelper.getCollection('post')

    const query = { creatorID }

    const mongoCursor = postCollection.find(query, {})

    const result: PostData[] = []

    await mongoCursor.forEach((post) => {
      result.push(post)
    })

    return result
  }

  public async save(postData: PostData): Promise<PostData> {
    const postCollection = MongoHelper.getCollection('post')

    await postCollection.insertOne(postData)

    return postData
  }
}
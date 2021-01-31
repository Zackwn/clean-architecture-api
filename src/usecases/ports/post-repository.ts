import { PostData } from "../../entities/post/post-data";

export interface PostRepository {
  save(postData: PostData): Promise<PostData>
  findAllFromCreator(creatorID: string): Promise<PostData[]>
}
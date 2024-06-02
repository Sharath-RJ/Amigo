import { User } from "../../entities/user";

export interface postRepository {
    createPost(images: string[], caption: string, user: User): Promise<boolean>
    getAllPost(): Promise<any>
    likePost(user: any, postid: string): Promise<any>
    unlikePost(user: any, postid: string): Promise<any>
}
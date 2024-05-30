import { User } from "../../entities/user";
import PostModel from "../../frameworks/database/mongodb/models/postModel";


export interface PostRepository {
    createPost(images: string[], caption: string, user: User): Promise<boolean>

    getPosts(): Promise<any>

    getPostDetails(id: string): Promise<any>

    publishPost(id: string): Promise<any>

    deletePost(id: string): Promise<any>

    getAllPosts(id: string): Promise<any>

    likePost(id: string, userid: string): Promise<any>

    commentPost(id: string, comment: string, userid: string): Promise<any>
    showComments(id: string): Promise<any>
    showLikes(id: string): Promise<any>

    getAllPostsofUser(id:string):Promise<any>
}

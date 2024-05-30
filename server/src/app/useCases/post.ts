import { PostRepository } from "../../app/repositories/postRepository"
import { User } from "../../entities/user"

export class PostUseCase {
    constructor(private postRepository: PostRepository) {}
    async addPost(images: string[], caption: string, user: User): Promise<boolean> {
        return await this.postRepository.createPost(images, caption, user);
    }
    async getPosts(){
        console.log("get post use case")
        return await this.postRepository.getPosts()
    }
    async getPostDetails(id:string){
        return await this.postRepository.getPostDetails(id)
    }
    async publishPost(id:string){
      return await this.postRepository.publishPost(id)
    }
    async deletePost(id:string){
       return await this.postRepository.deletePost(id)
    }
    async getAllPosts(id:string){
        return await this.postRepository.getAllPosts(id)
    }
    async likePost(id:string,userid:string){
       return await this.postRepository.likePost(id,userid)
    }
    async commentPost(id:string,comment:string,userid:string){
        return await this.postRepository.commentPost(id,comment,userid)
    }
    async showComments(id:string){
        return await this.postRepository.showComments(id)
    }

    async showLikes(id:string){
        return await this.postRepository.showLikes(id)
    }
}

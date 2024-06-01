import { User } from "../../entities/user";
import { postRepository } from "../repositories/postRepository";

export class PostUseCase {
    constructor(private postRepository: postRepository) {}
    async addPost(
        images: string[],
        caption: string,
        user: User    ): Promise<boolean> {
        return await this.postRepository.createPost(images, caption, user)
    }
    async getAllPosts(){
        return await this.postRepository.getAllPost()
    }
}

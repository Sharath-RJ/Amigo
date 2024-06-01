import { User } from "../../entities/user";

export interface postRepository {
    createPost(images: string[], caption: string, user: User): Promise<boolean>
}
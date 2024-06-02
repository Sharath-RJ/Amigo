import { postRepository } from "../../../../app/repositories/postRepository";
import { User } from "../../../../entities/user";
import PostModel from "../models/postModel";

export class postRepositoryMongoDB implements postRepository {
    async createPost(
        image: String[],
        caption: string,
        user: User
    ): Promise<boolean> {
        try {
            await PostModel.create({ image, caption, user })
            return true
        } catch (error) {
            console.error("Error creating post:", error)
            return false
        }
    }

    async getAllPost() {
        try {
            return await PostModel.find({ status: "Published" }).populate(
                "user",
                "username"
            )
        } catch (error) {
            console.log(error)
        }
    }
    async likePost(user:any, postid:string): Promise<any> {
        try {
                   const post = await PostModel.findOneAndUpdate(
                       { _id: postid },
                       { $push: { likes: user._id } }, 
                       { new: true } 
                   )

            return post
        } catch (error) {
            console.log(error)
        }
    }
    async unlikePost(user:any, postid:string): Promise<any> {
        try {
                   const post = await PostModel.findOneAndUpdate(
                       { _id: postid },
                       { $pull: { likes: user._id } }, 
                       { new: true } 
                   )

            return post
        } catch (error) {
            console.log(error)
        }
    }
  
}
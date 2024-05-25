import { PostRepository } from "../../../../app/repositories/postRepository";
import PostModel from "../../../../frameworks/database/mongodb/models/postModel";
import { User } from "../../../../entities/user";

export class PostRepositoryMongoDB implements PostRepository {
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

    async getPosts(): Promise<any> {
        try {
            const posts = await PostModel.find().populate("user", "username")
            console.log("posts db")
            return posts
        } catch (error) {
            console.error("Error getting posts:", error)
            return []
        }
    }
    async getPostDetails(id: String): Promise<any> {
        try {
            const posts = await PostModel.findById(id).populate(
                "user",
                "username"
            )
            console.log("posts db")
            return posts
        } catch (error) {
            console.error("Error getting posts:", error)
            return []
        }
    }
    async publishPost(id: string): Promise<any> {
        try {
            const post = await PostModel.findByIdAndUpdate(
                id,
                { status: "Published" },
                { new: true }
            )
            return post
        } catch (error) {
            console.error("Error getting posts:", error)
            return []
        }
    }
    async deletePost(id: string): Promise<any> {
        try {
            const post = await PostModel.findByIdAndDelete(id)
            if (!post) {
                throw new Error("Post not found")
            }
            return post
        } catch (error) {
            console.error("Error deleting post:", error)
            throw new Error("Error deleting post")
        }
    }

    async getAllPosts(): Promise<any> {
        try {
            const post = await PostModel.find({ status: "Published" }).populate(
                "user",
                "username"
            )
            return post
        } catch (error) {
            console.log(error)
        }
    }
    async likePost(postId: string, userId: string): Promise<any> {
        try {
            const updatedPost = await PostModel.findByIdAndUpdate(
                postId,
                { $push: { likes: { userid: userId } } },
                { new: true }
            )
            return updatedPost
        } catch (error) {
            console.error("Error liking post:", error)
            throw error
        }
    }
    async commentPost(
        id: string,
        comment: string,
        userid: string
    ): Promise<any> {
        try {
            const updatedPost = await PostModel.findByIdAndUpdate(
                id,
                { $push: { comments: { comment, userid } } },
                { new: true }
            )
            return updatedPost
        } catch (error) {
            console.log(error)
        }
    }

    async showComments(id: string): Promise<any> {
        try {
            const comments = await PostModel.findOne(
                { _id: id },
                { comments: 1 }
            ).populate("comments.userid", "username")
            return comments
        } catch (error) {
            console.log(error)
        }
    }
    async showLikes(id: string): Promise<any> {
        try {
            const likes = await PostModel.findOne(
                { _id: id },
                { likes: 1 }
            ).populate("likes.userid", "username")
            return likes
        } catch (error) {
            console.log(error)
        }
    }
}

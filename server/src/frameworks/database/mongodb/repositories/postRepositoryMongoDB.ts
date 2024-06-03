import { afterEach } from "node:test";
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
    async likePost(user: any, postid: string): Promise<any> {
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
    async unlikePost(user: any, postid: string): Promise<any> {
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

//     async commentPost(
//         postid: string,
//         text: string,
//         userid: string
//     ): Promise<any> {
//         try {
//              console.log(postid)
//              console.log(text)
//              console.log(userid)
//         } catch (error) {
//             console.error("Error commenting on post:", error)
//             throw error // Throwing the error for better error handling
//         }
//     }
// }

 async commentPost(postid: string, text: string, userid:string ): Promise<any> {
        try {
        
            const post = await PostModel.findByIdAndUpdate(
                postid ,
                { $push: { comments: { text: text, postedBy: userid } } },
                {upsert:true,new:true}
            )
    
            console.log(post)
            return post
        } catch (error) {
            console.log(error)
        }
    }



    async showComments(id:string): Promise<any> {
        try {
            const post = await PostModel.findById(id).select("comments").populate("comments.postedBy", "username")
            return post
        } catch (error) {
            console.log(error)
        }
    }
    async showLikes(id:string): Promise<any> {
        try {
             return await PostModel.findById(id).select("likes").populate("likes", "username")  
        } catch (error) {
          console.log(error)  
        }
     
}
}


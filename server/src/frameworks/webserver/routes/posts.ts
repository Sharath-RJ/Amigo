import express, { Router } from "express"
import { postConteoller } from "../../../adapters/controllers/postController"
import { PostUseCase } from "../../../app/useCases/post"
import { postRepositoryMongoDB } from "../../../frameworks/database/mongodb/repositories/postRepositoryMongoDB"
import upload from "../../../frameworks/webserver/middlewares/multerMiddleware"

export default function PostsRouter(): Router {
    const router = express.Router()

    const postRepository = new postRepositoryMongoDB()
    const postUseCase = new PostUseCase(postRepository)
    const postController = new postConteoller(postUseCase)

    router.post(
        "/addPost",
        upload.array("images"),
        postController.addPost.bind(postController)
    )
    // // router.get("/getPosts", postController.getPosts.bind(postController))
    // router.get(
    //     "/viewPost/:id",
    //     postController.getPostDetails.bind(postController)
    // )
 
    // router.delete("/delete/:id", postController.deletePost.bind(postController))
    // // router.get("/getAllPosts/:id", postController.getAllPosts.bind(postController))

    // router.patch(
    //     "/commentPost/:id",
    //     postController.commentPost.bind(postController)
    // )
    // router.get(
    //     "/showComments/:id",
    //     postController.showComments.bind(postController)
    // )
    // // router.get(
    // //     "/getAllPostsofUser/:id",
    // //     postController.getAllPostsofUser.bind(postController)
    // // )

    return router
}

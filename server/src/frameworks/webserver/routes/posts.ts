import express, { Router } from "express"
import { PostController } from "../../../adapters/controllers/postController"
import { PostUseCase } from "../../../app/useCases/post"
import { postRepositoryMongoDB } from "../../../frameworks/database/mongodb/repositories/postRepositoryMongoDB"
import upload from "../../../frameworks/webserver/middlewares/multerMiddleware"
import authenticate from "../middlewares/authMiddleware"

export default function PostsRouter(): Router {
    const router = express.Router()

    const postRepository = new postRepositoryMongoDB()
    const postUseCase = new PostUseCase(postRepository)
    const postController = new PostController(postUseCase)

    router.post(
        "/addPost",
        upload.array("images"),
        postController.addPost.bind(postController)
    )

    router.get("/getAllPosts", postController.getAllPosts.bind(postController))
    

    
    router.put(
        "/likePost/:postid",
        authenticate,
        postController.likePost.bind(postController)
    )
    router.put(
        "/unlikePost/:postid",
        authenticate,
        postController.unlikePost.bind(postController)
    )
    // router.delete("/delete/:id", postController.deletePost.bind(postController))

    router.put(
        "/commentPost/:id",
        authenticate,
        postController.commentPost.bind(postController)
    )
    router.get(
        "/showComments/:id",
        postController.showComments.bind(postController)
    )
    router.get("/showLikes/:id", postController.showLikes.bind(postController))
    router.get(
        "/getAllPostsofUser/:id", authenticate,
        postController.getAllPostsofUser.bind(postController)
    )
    router.delete(
        "/deletePostImage/:postid/:image",
        authenticate,
        postController.deletePostImage.bind(postController)
    )
    router.delete(
        "/deletePost/:postid",
        authenticate,
        postController.deletePost.bind(postController)
    )

    router.put(
        "/updatePost/:postid",
        authenticate,
        postController.updatePost.bind(postController)
    )

    return router
}

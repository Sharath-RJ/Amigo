import express, { Router } from "express"
import { postConteoller } from "../../../adapters/controllers/postConteollers"
import { PostUseCase } from "../../../app/useCases/post"
import { PostRepositoryMongoDB } from "../../../frameworks/database/mongodb/repositories/postRepositoryMongoDB"
import  upload from "../../../frameworks/webserver/middlewares/multerMiddleware"

export default function PostsRouter(): Router { const router = express.Router()

const postRepository = new PostRepositoryMongoDB()
const postUseCase = new PostUseCase(postRepository)
const postController = new postConteoller(postUseCase)

router.post("/addPost",upload.single("image"), postController.addPost.bind(postController))
router.get("/getPosts", postController.getPosts.bind(postController))
router.get("/viewPost/:id", postController.getPostDetails.bind(postController))
router.patch("/publish/:id", postController.publishPost.bind(postController))
router.delete("/delete/:id", postController.deletePost.bind(postController))
router.get("/getAllPosts", postController.getAllPosts.bind(postController))
router.patch("/likePost/:id", postController.likePost.bind(postController))
router.patch("/commentPost/:id", postController.commentPost.bind(postController))
router.get("/showComments/:id", postController.showComments.bind(postController))
router.get("/showLikes/:id", postController.showLikes.bind(postController))

return router
}
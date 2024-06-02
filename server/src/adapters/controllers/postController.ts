// postController.ts
import { Request, Response } from "express"
import { PostUseCase } from "../../app/useCases/post"
import { postRepositoryMongoDB } from "../../frameworks/database/mongodb/repositories/postRepositoryMongoDB"

interface customRequest extends Request{
    user?:any;

}

export class PostController {
    constructor(private postUseCase: PostUseCase) {}



    async addPost(req: Request, res: Response): Promise<void> {
        try {
            const { caption, user } = req.body
            const files = req.files as Express.Multer.File[]

            const imagePaths = files.map((file) => file.filename)

            const success = await this.postUseCase.addPost(
                imagePaths,
                caption,
                user
            )

            if (success) {
                res.status(201).json({
                    message: "Post created successfully",
                })
            } else {
                res.status(400).json({ error: "Post creation failed" })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    async getAllPosts(req: Request, res: Response) {
        const posts = await this.postUseCase.getAllPosts()
        if (posts) {
            res.status(201).json(posts)
        }
    }

    async likePost(req: customRequest, res: Response) {
        try {
            console.log("hellllllllllllooooooooooo")
            console.log("mmmmmmmmmmmmmmmmmmmmmmm",req.user) // req.user should now be recognized
            // Your like post logic here
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
}

const postRepository = new postRepositoryMongoDB()
const postUseCase = new PostUseCase(postRepository)

export const postController = new PostController(postUseCase)

import { Request, Response } from "express"
import { PostUseCase } from "../../app/useCases/post"

export class postConteoller {
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

    async getPosts(req: Request, res: Response): Promise<void> {
        try {
            console.log("getposts controller")
            const posts = await this.postUseCase.getPosts()
            if (posts) {
                res.status(200).json(posts)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getPostDetails(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const post = await this.postUseCase.getPostDetails(id)
            if (post) {
                res.status(200).json(post)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async publishPost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const post = await this.postUseCase.publishPost(id)
            if (post) {
                res.status(200).json(post)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const post = await this.postUseCase.deletePost(id)
            if (post) {
                res.status(200).json(post)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await this.postUseCase.getAllPosts()
            if (posts) {
                res.status(200).json(posts)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async likePost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { userId } = req.body
            console.log(id)
            console.log(userId)
            const post = await this.postUseCase.likePost(id, userId)

            if (post) {
                res.status(200).json(post)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async commentPost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { userId, comment } = req.body
            const post = await this.postUseCase.commentPost(id, comment, userId)
            if (post) {
                res.status(200).json(post)
            }
        } catch (error) {
            console.log(error)
        }
    }
    async showComments(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const comments = await this.postUseCase.showComments(id)
            if (comments) {
                res.status(200).json(comments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async showLikes(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const likes = await this.postUseCase.showLikes(id)
            if (likes) {
                res.status(200).json(likes)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

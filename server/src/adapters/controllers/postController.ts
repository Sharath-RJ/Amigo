import { PostUseCase } from "../../app/useCases/post"
import { Request, Response, NextFunction } from "express"

export  class postConteoller {
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

   async getAllPosts(req:Request, res:Response){
       const posts= await this.postUseCase.getAllPosts()
       if(posts){
        res.status(201).json(posts)
       }
    }
}
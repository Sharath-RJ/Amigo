import { Request, Response } from "express"
import { chatUseCase } from "../../app/useCases/chat"
import { Server as SocketIOServer } from "socket.io"

export class chatController {
    constructor(
        private _chatUseCase: chatUseCase,
        private io: SocketIOServer
    ) {}

    async sendMessage(req: Request, res: Response): Promise<void> {
        const { sender, receiver, content , audioUrl} = req.body
        try {
            const message = await this._chatUseCase.sendMessage(
                sender,
                receiver,
                content,
                audioUrl
            )
            this.io.to(receiver).emit("newMessage", message) // Emit message to receiver
            res.json(message)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "An error occurred" })
        }
    }

    async getChatHistory(req: Request, res: Response): Promise<void> {
        const { senderId, receiverId } = req.params
        try {
            const messages = await this._chatUseCase.getChatHistory(
                senderId,
                receiverId
            )
            res.json(messages)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "An error occurred" })
        }
    }

    getChatUsers = async (req: Request, res: Response) => {
        try {
            const currentUser = req.params.id
            const users = await this._chatUseCase.getChatUsers(currentUser)
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({
                message: "An error occurred while fetching chat users",
                error,
            })
        }
    }
}

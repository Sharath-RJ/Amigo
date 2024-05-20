import { Request, Response } from "express"
import { chatUseCase } from "../../app/useCases/chat"

export class chatController {
    static sendMessage: any
    constructor(private _chatUseCase: chatUseCase) {}

    async sendMessage(req: Request, res: Response): Promise<void> {
        const { sender, receiver, content } = req.body
        try {
            const message = await this._chatUseCase.sendMessage(
                sender,
                receiver,
                content
            )
            res.json(message)
        } catch (error) {
            console.log(error)
        }
    }
}

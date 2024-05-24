import express, { Router } from "express"
import { chatController as ChatControllerClass } from "../../../adapters/controllers/chatController"
import { messageRepositoryMongoDB } from "../../database/mongodb/repositories/messageRepositoryMongoDB"
import { chatUseCase } from "../../../app/useCases/chat"
import { io } from "../../../app" // Adjust the path accordingly

export default function ChatRouter(): Router {
    const router = express.Router()
    const chatRepository = new messageRepositoryMongoDB()
    const chatUseCaseInstance = new chatUseCase(chatRepository)
    const chatControllerInstance = new ChatControllerClass(
        chatUseCaseInstance,
        io
    ) // Pass io instance

    router.post(
        "/send",
        chatControllerInstance.sendMessage.bind(chatControllerInstance)
    )
    router.get(
        "/getAllMessages/:senderId/:receiverId",
        chatControllerInstance.getChatHistory.bind(chatControllerInstance)
    )
    router.get(
        "/getChatUsers/:id",
        chatControllerInstance.getChatUsers.bind(chatControllerInstance)
    )
    return router
}

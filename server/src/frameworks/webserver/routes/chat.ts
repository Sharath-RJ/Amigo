import express, { Router } from "express"
import { chatController } from "../../../adapters/controllers/chatController"

export default function ChatRouter():Router{
    const router = express.Router()
    router.post("/send",chatController.sendMessage.bind(chatController))
    return router
}
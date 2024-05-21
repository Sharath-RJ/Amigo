import express, { Router } from "express";
import { chatController as ChatControllerClass } from "../../../adapters/controllers/chatController"; // Renamed import
import { messageRepositoryMongoDB } from "../../database/mongodb/repositories/messageRepositoryMongoDB";
import { chatUseCase } from "../../../app/useCases/chat";

export default function ChatRouter(): Router {
  const router = express.Router();
  const chatRepository = new messageRepositoryMongoDB();
  const chatUseCaseInstance = new chatUseCase(chatRepository);
  const chatControllerInstance = new ChatControllerClass(chatUseCaseInstance); 

  router.post("/send", chatControllerInstance.sendMessage.bind(chatControllerInstance)); 
 router.get("/getAllMessages/:senderId/:receiverId", chatControllerInstance.getChatHistory.bind(chatControllerInstance));
  return router;
}

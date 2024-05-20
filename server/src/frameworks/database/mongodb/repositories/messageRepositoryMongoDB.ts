import { messageRepository } from "../../../../app/repositories/messageRepository";
import { IMessage, MessageModel } from "../models/messageModel";

export class messageRepositoryMongoDB implements messageRepository {
    async saveMessage(  sender: string,  receiver: string,  content: string ): Promise<IMessage> {
        const message: IMessage = new MessageModel({
            sender,
            receiver,
            content,
            timestamp: new Date(),
            status: "sent",
        })
        return message.save()
    }
}
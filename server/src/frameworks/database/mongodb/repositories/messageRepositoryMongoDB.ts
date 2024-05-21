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
     async getMessagesBetweenUsers(user1: string, user2: string): Promise<IMessage[]> {
    const messages = await MessageModel.find({
        $or: [
            { sender: user1, receiver: user2 },
            { sender: user2, receiver: user1 },
        ],
    }).sort({ timestamp: 1 }).exec();

    return messages as IMessage[];
}
}
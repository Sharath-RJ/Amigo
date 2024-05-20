import { channel } from "diagnostics_channel";
import { IMessage } from "../../frameworks/database/mongodb/models/messageModel";
import { messageRepository } from "../repositories/messageRepository";

export class chatUseCase {
    constructor(private _messageRepository:messageRepository) {}

    async sendMessage(   sender: string,   receiver: string,   content: string   ): Promise<IMessage> {
        return await this._messageRepository.saveMessage(sender,receiver,content)
    }
}
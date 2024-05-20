import {IMessage} from "../../frameworks/database/mongodb/models/messageModel"

export interface messageRepository {
 saveMessage(sender:string,receiver:string,content:string): Promise<IMessage>;   
}

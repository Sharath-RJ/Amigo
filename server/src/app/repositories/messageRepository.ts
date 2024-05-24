import {IMessage} from "../../frameworks/database/mongodb/models/messageModel"

export interface messageRepository {
 saveMessage(sender:string,receiver:string,content:string): Promise<IMessage>; 
 getMessagesBetweenUsers(user1: string, user2: string): Promise<IMessage[]>
 getChatUsers(currentUser: string): Promise<string[]>  
}

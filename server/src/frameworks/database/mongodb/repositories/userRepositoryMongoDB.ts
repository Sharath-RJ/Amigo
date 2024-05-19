
import { UserRepository } from "../../../../app/repositories/userReppository"
import { User } from "../../../../entities/user"
import { UserModel} from "../../../../frameworks/database/mongodb/models/userModel"

export class UserRepositoryMongo implements UserRepository {
    async createUser( username: string, email: string, password: string ): Promise<boolean> {
        try {  
                 await UserModel.create({ username, email, password })
                 return true
            
        } catch (error) {
            console.error("Error creating user:", error)
            return false
        }
    }
async authenticateUser(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (user && user.password) {
        return user;
    } else {
        return null;
    }
}
}

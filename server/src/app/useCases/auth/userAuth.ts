
import { UserRepository } from "../../../app/repositories/userReppository"
import { User } from "../../../entities/user"
import {AuthServiceInterface} from "../../../app/services/authServiceInterface"
export class AuthUseCase {
    constructor(private userRepository: UserRepository) {}

    async register(  username: string,  email: string,  password: string   ): Promise<boolean> {
        
      const encryptedPassword = await AuthServiceInterface.encryptPassword(
          password
      )
        return await this.userRepository.createUser(username, email, encryptedPassword)
    }

    async login(email: string, password: string): Promise<User | null> {
        return await this.userRepository.authenticateUser(email, password)
    }
}

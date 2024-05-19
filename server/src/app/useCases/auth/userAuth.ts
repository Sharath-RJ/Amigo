
import { UserRepository } from "../../../app/repositories/userReppository"
import { AuthServiceInterface } from "../../services/authServiceInterface"
import { User } from "../../../entities/user"

export class AuthUseCase {
    constructor(private _userRepository: UserRepository, private _authService: AuthServiceInterface) {}

    async register(  username: string,  email: string,  password: string   ): Promise<boolean> {
        
       const bcryptedPassword= await this._authService.encryptPassword(password)
       return await this._userRepository.createUser(username, email, bcryptedPassword)
    }

    async login(email: string, password: string): Promise<User | null> {
        return await this._userRepository.authenticateUser(email, password)
    }
}

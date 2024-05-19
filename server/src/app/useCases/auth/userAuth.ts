
import { UserRepository } from "../../../app/repositories/userReppository"
import { User } from "../../../entities/user"

export class AuthUseCase {
    constructor(private userRepository: UserRepository) {}

    async register(
        username: string,
        email: string,
        password: string
    ): Promise<boolean> {
        

        return await this.userRepository.createUser(username, email, password)
    }

    async login(email: string, password: string): Promise<User | null> {
        return await this.userRepository.authenticateUser(email, password)
    }
}

import { UserRepository } from "../../../app/repositories/userReppository"
import { User } from "../../../entities/user"
import { AuthServiceInterface } from "../../../app/services/authServiceInterface"

export class AuthUseCase {
    constructor(
        private userRepository: UserRepository,
        private authService: AuthServiceInterface
    ) {}

    async register(
        username: string,
        email: string,
        password: string
    ): Promise<boolean> {
        const encryptedPassword = await this.authService.encryptPassword(
            password
        )
        return this.userRepository.createUser(
            username,
            email,
            encryptedPassword
        )
    }

    async login(
        email: string,
        password: string
    ): Promise<{ user: User; token: string } | null> {
        const user = await this.userRepository.authenticateUser(email)
        if (
            user &&
            (await this.authService.comparePassword(password, user.password))
        ) {
            const token = this.authService.generateToken({ id: user.id })
            return { user, token }
        }
        return null
    }
}


import { UserRepository } from "../../../app/repositories/userReppository"
import { AuthServiceInterface } from "../../services/authServiceInterface"
import { User } from "../../../entities/user"

export class AuthUseCase {
    constructor(private _userRepository: UserRepository, private _authService: AuthServiceInterface) {}

    async register(  username: string,  email: string,  password: string ): Promise<boolean> {
        
       const bcryptedPassword= await this._authService.encryptPassword(password)
       return await this._userRepository.createUser(username, email, bcryptedPassword)
    }

    async login(email: string, password: string): Promise<{token:string, user:User} | null> {
        const user = await this._userRepository.authenticateUser(email)
        if(user && (await this._authService.comparePassword(password,user.password))){
           const token= this._authService.generateToken(user._id)
           return {token, user}
        }
        return null
    }

    async generateOtp(phoneNumber: string): Promise<any> {
        console.log("generate otp use case",phoneNumber)
        return await this._authService.generateOTP(phoneNumber)
    }
}

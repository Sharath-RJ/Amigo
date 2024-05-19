import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import configKeys from "../../config"
import { AuthServiceInterface } from "../../app/services/authServiceInterface"
export  class AuthService implements AuthServiceInterface {
    encryptPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    comparePassword(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword)
    }
    generateToken(id:string): string {
           const token = jwt.sign({ id }, configKeys.JWT_KEY, { expiresIn: "5d" });
           return token;
    }
}


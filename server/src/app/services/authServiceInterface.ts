// frameworks/services/authServiceInterface.ts

export interface AuthServiceInterface {
    encryptPassword(password: string): Promise<string>
    comparePassword(password: string, hashedPassword: string): Promise<boolean>
    generateToken(payload: { payload: string; role: string }): string
    verifyToken(token: string): any
}

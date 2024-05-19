

export interface AuthServiceInterface {
    encryptPassword(password: string): string
    comparePassword(password: string, hashedPassword: string):boolean
    // generateToken(payload: { payload: string; role: string }): string
    // verifyToken(token: string): any
}

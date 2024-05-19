import dotenv from "dotenv"
dotenv.config()

const configKeys = {
    MONGO_DB_URL: process.env.DATABASE as string,
    JWT_SECRET: process.env.JWT_KEY as string,
    PORT: process.env.PORT,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID!,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN!,
    TWILIO_SERVICE_SID: process.env.TWILIO_PHONE!,
}


export default configKeys

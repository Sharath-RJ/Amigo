import dotenv from "dotenv"
dotenv.config()

const configKeys = {
    MONGO_DB_URL: process.env.DATABASE as string,
    JWT_KEY: process.env.JWT_KEY as string,
    PORT: process.env.PORT,
}


export default configKeys

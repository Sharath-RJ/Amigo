import { Schema, model, Document } from "mongoose"

// Define the interface for the Post document
interface IPost extends Document {
    image: string[]
    caption: string
    user: string // Assuming user is referenced by their ID
    createdAt: Date
    updatedAt: Date
}

// Define the schema for the Post document
const postSchema = new Schema<IPost>(
    {
        image: { type: [String], required: true },
        caption: { type: String, required: true },
        user: { type: String, ref: "User", required: true },
    },
    { timestamps: true }
)

// Create and export the Post model
const PostModel = model<IPost>("Post", postSchema)

export default PostModel

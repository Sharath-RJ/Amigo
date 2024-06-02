import { Schema, model, Document, Types } from "mongoose"

// Define the interface for the Post document
interface IPost extends Document {
    image: string[]
    caption: string
    user: Types.ObjectId // Assuming user is referenced by their ID
    status: string
    createdAt: Date
    updatedAt: Date
    likes: Types.ObjectId[]
}

// Define the schema for the Post document
const postSchema = new Schema<IPost>(
    {
        image: { type: [String], required: true },
        caption: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, default: "not Published" },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
)

// Create and export the Post model
const PostModel = model<IPost>("Post", postSchema)

export default PostModel

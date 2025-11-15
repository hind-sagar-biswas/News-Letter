import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    img: {
        type: String,
        required: [true, "img is required"],
    },
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    body: {
        type: String,
        required: [true, "body is required"]
    }
}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;

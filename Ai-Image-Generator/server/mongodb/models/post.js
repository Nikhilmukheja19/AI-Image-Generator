import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    prompt: { type: String, required: true },
    photo: { type: Buffer, required: true }, // Storing photo as binary data (Buffer)
  },
  { timestamps: true },
); // Optional: adds createdAt and updatedAt timestamps

const Post = mongoose.model('Post', postSchema);

export default Post;

import express from 'express';
import * as dotenv from 'dotenv';
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

// Fetch all posts
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});

    // Convert photo data from Buffer to Base64 string for the client
    const formattedPosts = posts.map((post) => ({
      // eslint-disable-next-line no-underscore-dangle
      ...post._doc,
      photo: `data:image/jpeg;base64,${post.photo.toString('base64')}`, // Add data prefix and convert buffer to base64
    }));

    res.status(200).json({ success: true, data: formattedPosts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Fetching posts failed, please try again',
    });
  }
});

// Create a new post
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    // Convert the Base64 photo string to a Buffer for storage
    const photoBuffer = Buffer.from(photo.split(',')[1], 'base64'); // Strips out "data:image/jpeg;base64," prefix if present

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoBuffer, // Store the photo as binary data in MongoDB
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Unable to create a post, please try again',
    });
  }
});

export default router;

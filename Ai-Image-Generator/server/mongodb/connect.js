import mongoose from 'mongoose';

const connectDB = (url = 'mongodb://127.0.0.1:27017/ai') => {
  mongoose.set('strictQuery', false); // or true, based on your preference

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('Failed to connect with MongoDB');
      console.error(err);
    });
};

export default connectDB;

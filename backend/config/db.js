// import mongoose from 'mongoose';

// const connectDB = async () => {
//   const uri = process.env.MONGO_URI;
//   if (!uri) throw new Error('MONGO_URI is not set');
//   mongoose.set('strictQuery', true);
//   await mongoose.connect(uri, {
//     dbName: process.env.MONGO_DB || undefined,
//   });
//   console.log('MongoDB connected');
// };

// export default connectDB;


import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set');
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // exit app if db fails
  }
};

export default connectDB;

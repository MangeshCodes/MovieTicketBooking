import mongoose from "mongoose";

// Cache the database connection
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose
            .connect(`${connectionString}/quickshow`, opts)
            .then((mongoose) => {
                console.log('MongoDB connected successfully');
                return mongoose;
            })
            .catch((error) => {
                console.log('MongoDB connection error:', error.message);
                throw error;
            });
    }
    
    cached.conn = await cached.promise;
    return cached.conn;
}


export default connectDB;

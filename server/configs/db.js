import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("DataBase Connected");
        });
        
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        
        await mongoose.connect(`${connectionString}/quickshow`);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.log('MongoDB connection error:', error.message);
        process.exit(1);
    }
}


export default connectDB;

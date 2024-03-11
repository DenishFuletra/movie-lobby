import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGOURL || '', {
            dbName: 'movie-lobby'
        } as ConnectOptions);
        console.log('MongoDB connected');
    } catch (err: any) {
        console.error('MongoDB connection error:', err.message);
    }
};

export default connectDB;

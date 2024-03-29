import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch(err) {
        console.error(err);
    }
}

export default connectDb;
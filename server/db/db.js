import mongoose, { connect } from "mongoose";
import { DB } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOURI}/${DB}`);
        console.log(`\n MongoDb Connected ! DB host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error: ", error);
        process.exit(1)
    }
}

export default connectDB;
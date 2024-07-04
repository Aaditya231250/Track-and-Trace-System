
import mongoose from "mongoose"
import {DB_Name} from "../constants.js"

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect('mongodb+srv://aadityaj222:nine9999@null-1.iyinn8x.mongodb.net/?retryWrites=true&w=majority&appName=Null-1')
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB
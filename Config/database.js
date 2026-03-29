import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
async function connectDatabase(){
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('Database Connected Successfully')
    } catch (error) {
        console.log('Error:',error.message)
        
    }
}

export default connectDatabase
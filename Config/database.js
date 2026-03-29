import mongoose from "mongoose"
async function connectDatabase(){
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/School')
        console.log('Database Connected Successfully')
    } catch (error) {
        console.log('Error:',error.message)
        
    }
}

export default connectDatabase
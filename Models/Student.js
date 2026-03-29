import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    Student_ID:{
        type:String
    },
    Name:{
        type:String,
        required:true
    },
    Stream:{
        type:String,
        required:true
    },
    Class:{
        type:String,
        required:true
    },
    hasVoted:{
        type:Boolean,
        default:false
    },
    otp:{
        type:Number,
        unique:true,
        sparse:true
    }
})

const studentModel = mongoose.model('Student',studentSchema)
export default studentModel
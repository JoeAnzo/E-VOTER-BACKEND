import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        enum:['Male','Female']
    },
    Department:{
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
},{timestamps:true})

const staffModel = mongoose.model('Staff',staffSchema)
export default staffModel
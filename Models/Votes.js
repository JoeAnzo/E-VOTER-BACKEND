import mongoose from "mongoose";

const votesSchema = new mongoose.Schema({
    Candidate_Name:{
        type:String,
        required:true,
    },
    education_Level:{
        type:String,
        required:true,
    },
    prefectorial_Post:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const votesModel = mongoose.model('Vote',votesSchema)
export default votesModel
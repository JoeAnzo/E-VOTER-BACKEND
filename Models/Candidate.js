import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    Candidate_Name:{
        type:String,
        required:true,
    },
    Class:{
        type:String,
        required:true,
    },
    Stream:{
        type:String,
        required:true
    },
    education_Level:{
        type:String,
        required:true,
    },
    prefectorial_Post:{
        type:String,
        required:true,
    },
    photo_URL:{
        type:String,
        required:[true,'Please provide the photo_URL']
    }
},{
    timestamps:true
})

const candidateModel = mongoose.model('Prefect',candidateSchema)
export default candidateModel
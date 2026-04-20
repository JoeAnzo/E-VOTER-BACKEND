import candidateModel from "../Models/Candidate.js"

export const createCandidate  = async (req,res) => {
    const {Candidate_Name,Class,Stream,education_Level,prefectorial_Post,photo_URL} = req.body
    try {
        const candidate = new candidateModel({
            Candidate_Name:Candidate_Name,
            Class:Class,
            Stream:Stream,
            education_Level:education_Level,
            prefectorial_Post:prefectorial_Post,
            photo_URL:photo_URL
        })
        await candidate.save()
        res.status(201).json({"Candidates":candidate}) 
    } catch (error) {
        res.status(500).json({"message":error.message})
    }
}

export const getCandidates = async (req,res)=>{
    try{
        const candidates = await candidateModel.find({})
        const postsCount = {}

        candidates.forEach(({prefectorial_Post})=>{
            postsCount[prefectorial_Post] = (postsCount[prefectorial_Post] || 0) + 1
        })
        const prefectsAnalysis = Object.keys(postsCount).map((post) => {
            return {
                name:post,
                value:postsCount[post]
            }
        })
        res.status(200).json({"candidates":candidates,"Analytics":prefectsAnalysis})
    } catch(error){
        res.json({"message":error.message})
    }
}

export const getAllCandidatePosts = async (req, res) => {
    try {
        const posts = await candidateModel.distinct('prefectorial_Post')
        res.status(200).json({"prefectorial_posts": posts})
    } catch (error) {
        res.status(500).json({"message": error.message})
    }
}

export const getCandidateById = async (req,res)=>{
    try {
        const {id} = req.params
        const candidate = await candidateModel.findById(id)
        res.status(200).json({"Candidates":candidate})   
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

export const getCandidatesByPost = async (req,res) => {
    const {post} = req.params
    try {
        const candidates = await candidateModel.find({prefectorial_Post:post})
        res.status(200).json(candidates)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export const deleteAllCandidates =  async (req,res) => {
    try {
        const result = await candidateModel.deleteMany({})
        res.status(200).json({"message": "All candidates deleted successfully", "deletedCount": result.deletedCount})
    } catch (error) {
        res.status(500).json({"message": error.message})
    }
}

export const deleteCandidateById = async (req,res) => {
    const {id} = req.params
    try{
        const deleteCandidate = await candidateModel.findByIdAndDelete(id)
        res.status(200).json({"message":"Candidate deleted successfully","candidate":deleteCandidate})
    } catch (error) {
        res.status(500).json({"message":error.message})
    }
}

export const updateCandidate = async (req,res) => {
    const {id} = req.params
    const updates = req.body
    try {
        const updatedCandidate = await candidateModel.findByIdAndUpdate(id, {$set:updates}, {new:true,runValidators:true})
        if (!updateCandidate){
            res.status(404).json({"message":"candidate not found"})
        }
        res.status(200).json({"message":"Candidate updated successfully","candidate":updatedCandidate})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
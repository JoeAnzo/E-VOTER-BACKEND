import votesModel from "../Models/Votes.js"
import studentModel from "../Models/Student.js"
import candidateModel from "../Models/Candidate.js"
export async function submitVotes(req,res) {
    const {votes,votersCode} = req.body
    console.log(votersCode)
  try {
    const voterInfo = await studentModel.find({otp:votersCode})
    if (!voterInfo[0].hasVoted){
        const submitedVotes = await votesModel.insertMany(votes)
        const updatedVoter = await studentModel.updateOne({otp:votersCode},{$set:{
            "hasVoted":true
        }})
        res.status(200).json({
        "submitedVotes":submitedVotes
    })
    } else {
        res.status(200).json({
            "message":`${voterInfo[0].Name} has already voted`
        })
    }
    
  } catch (error) {
    res.status(500).json(
        {
            "message":"failed",
            "error":error.message
        }
    )
  }
    

}

export async function viewAllVotes(req,res) {
    try {
        const votes = await votesModel.find({})
        const Analytics = votes.reduce((acc,{Candidate_Name,prefectorial_Post,education_Level}) => {
            acc[education_Level] = acc[education_Level] || {}
            acc[education_Level][prefectorial_Post] = acc[education_Level][prefectorial_Post] || {}
            acc[education_Level][prefectorial_Post][Candidate_Name] = (acc[education_Level][prefectorial_Post][Candidate_Name] || 0) + 1
            return acc
        },{})
        res.status(200).json({
            "Votes":votes,
            "VotesAnalytics":Analytics
        })
    } catch (error) {
        res.status(500).json({
            "message":error.message
        })
    }
}

export async function deleteAllVotes(req,res) {
    try {
        const deleteVotes = await votesModel.deleteMany()
        const totalNumberOfDeletedVotes = deleteVotes.deletedCount
        res.status(200).json({
            "message":`Deleted ${totalNumberOfDeletedVotes} submitted votes successfully`
        })
    } catch (error) {
        res.status(500).json({
            "message":"Failed",
            "message":error.message
        })
    }
}

export async function getVotesForSpecificPost(req,res) {
    const {post} = req.params
    try {
        const specificPostVotes = await votesModel.find({prefectorial_Post:post})
        const candidatesOfThisPost = await candidateModel.find({prefectorial_Post:post},{Candidate_Name:1,_id:0})
        const votesSummary = specificPostVotes.reduce((acc,{Candidate_Name,prefectorial_Post})=>{
            acc[Candidate_Name] = (acc[Candidate_Name] || 0) + 1
            return acc
        },{})

        const results = candidatesOfThisPost.map((candidate) => {
            return {
                Name:candidate.Candidate_Name,
                voteCount:votesSummary[candidate.Candidate_Name] || 0
            }

        })
        if (specificPostVotes){
            res.status(200).json(
                {
                    "message":`Votes for ${post}`,
                    "candidates":candidatesOfThisPost,
                    "Votes":specificPostVotes,
                    "Analytics":results
                }
            )
        } else {
            res.status(200).json({
                "message":"This post is invalid or not found",
                "Votes":[]
            })
        }
    } catch (error) {
        res.status(500).json({
            "message":"Failed",
            "error":error.message
        })
    }
}
import express from "express"
import { Router } from "express"
import { submitVotes,viewAllVotes,deleteAllVotes,getVotesForSpecificPost} from "../Controllers/votesController.js"
const votesRouter = Router()

votesRouter.post('/',submitVotes)
votesRouter.get('/',viewAllVotes)
votesRouter.get('/:post',getVotesForSpecificPost)
votesRouter.delete('/',deleteAllVotes)

export default votesRouter
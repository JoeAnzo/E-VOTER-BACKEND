import express from 'express';
import { 
    createCandidate,
    getCandidates,
    getAllCandidatePosts,
    getCandidateById,
    getCandidatesByPost,
    deleteAllCandidates,
    deleteCandidateById,
    updateCandidate
       } from '../Controllers/candidatesController.js';
const candidatesRouter = express.Router();
candidatesRouter.post('/',createCandidate)
candidatesRouter.get('/',getCandidates)
candidatesRouter.get('/posts',getAllCandidatePosts)
candidatesRouter.get('/posts/:post',getCandidatesByPost)
candidatesRouter.get('/:id',getCandidateById)
candidatesRouter.delete('/All',deleteAllCandidates)
candidatesRouter.delete('/:id',deleteCandidateById)
candidatesRouter.patch('/:id',updateCandidate)
export default candidatesRouter;
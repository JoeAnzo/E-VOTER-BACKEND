import express from 'express';
import { 
    createCandidate,
    getCandidates,
    getAllCandidatePosts,
    getCandidateById,
    getCandidatesByPost,
    deleteAllCandidates,
    deleteCandidateById,
    searchForCandidateByName,
    getCandidatesByClass,
    updateCandidate
       } from '../Controllers/candidatesController.js';
const candidatesRouter = express.Router();
candidatesRouter.post('/',createCandidate)
candidatesRouter.get('/',getCandidates)
candidatesRouter.get('/search',searchForCandidateByName)
candidatesRouter.get('/posts',getAllCandidatePosts)
candidatesRouter.get('/posts/:post',getCandidatesByPost)
candidatesRouter.get('/:id',getCandidateById)
candidatesRouter.delete('/All',deleteAllCandidates)
candidatesRouter.delete('/:id',deleteCandidateById)
candidatesRouter.patch('/:id',updateCandidate)
candidatesRouter.get('/Class/:grade',getCandidatesByClass)
export default candidatesRouter;
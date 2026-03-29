import express from 'express'
import { 
    getAllStudents,
    getStudentByID,
    getStudentsByGrade,
    searchForStudentByName,
    addNewStudent,
    deleteStudentByID,
    getOneStudent
 } from '../Controllers/studentsController.js'

const studentsRouter = express.Router()

studentsRouter.get('/',getAllStudents)
studentsRouter.get('/search',searchForStudentByName)
studentsRouter.get('/Class/:grade',getStudentsByGrade)
studentsRouter.post('/',addNewStudent)
studentsRouter.delete('/delete/:id',deleteStudentByID)
studentsRouter.get('/One',getOneStudent)
studentsRouter.get('/:id',getStudentByID)
export default studentsRouter


import studentModel from "../Models/Student.js"
export const getAllStudents = async (req,res)=>{
    try {
        const Students = await studentModel.find({})
        res.status(200).json({"Students":Students,"message":{"status":res.statusCode}})
    } catch (error) {
        res.status(500).json({message:"failed",error:error.message})
        console.log(error.message)
    }
}

export const getStudentByID = async (req,res) => {
    const {id} = req.params
    try {
        const Student = await studentModel.findById(id)
        res.status(200).json({"Students":Student})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getStudentsByGrade = async (req,res) => {
    const {grade} = req.params
    try {
        const Students = await studentModel.find({Class:grade})
        res.status(200).json({"Students":Students})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const searchForStudentByName = async (req,res) =>{
    const {q} = req.query
    try {
        if(!q) return res.status(400).json({message:"query 'q' is required"})

        const searchResults = await studentModel.find({ Name: { $regex: q, $options: 'i' } })
            .limit(5)

        res.status(200).json({ Students:searchResults})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log('error',error.message)
    }
}

export const addNewStudent = async (req,res) => {
    const {Name,Class,Stream} = req.body
    try {
        const newStudent = new studentModel({
            Name:Name,
            Class:Class,
            Stream:Stream
        })
        await newStudent.save()
        res.status(201).json({"message":"Student added successfully","student":newStudent})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteStudentByID = async (req,res) => {
    const {id} = req.params
    try {
        const deletedStudent = await studentModel.findByIdAndDelete(id)
        res.status(200).json({"message":"Student deleted successfully","student":deletedStudent})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getOneStudent = async (req,res) => {
    const {Name,Class,Stream,otp} = req.query
    try {
        const query = {}
        
        if(Name) query.Name = Name
        if(Class) query.Class = Class
        if(Stream) query.Stream = Stream
        if(otp) query.otp = Number(otp)
        
        if(Object.keys(query).length === 0) {
            return res.status(400).json({message:"At least one query parameter (Name, Stream, Class, or otp) is required"})
        }
        
        const student = await studentModel.find(query)
        res.status(200).json({"querySearchResult":student})
    } catch (error)
     {
        res.status(404).json({message:error.message})
    }

}
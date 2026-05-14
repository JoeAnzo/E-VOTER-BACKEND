import staffModel from "../Models/staff.js";

export const getAllStaffMembers =  async (req,res) => {
    try {
        const allSaffMembers = await staffModel.find({})
        const Analytics = allSaffMembers.reduce((acc,{Department}) => {
            const department = Department
            acc[department] = (acc[department] || 0) + 1
            return acc
        },{})
        const formattedData = Object.entries(Analytics).map(([department,total]) => {
            return {
                Department:department,
                totalCount:total
            }
        })
        console.log(formattedData)
        res.status(200).json({
            StaffMembers:allSaffMembers,
            Analytics:formattedData
        })
    } catch (error) {
        res.status(500).json({
            message:"Failed",
            error:error.message
        })
    }
    

}

export const addNewStaffMember = async (req,res) => {
    const {Name,Department} = req.body
    try {
        const newStaffMember = new staffModel({Name:Name,Department:Department})
        await newStaffMember.save()
        res.status(200).json({
            newStaffMember:newStaffMember
        })
    } catch (error) {
        res.status(500).json({
            message:"Failed",
            error:error.message
        })
    }
}

export const deleteAllStaffMembers =  async (req,res) => {
    try {
        const deletedSaffMembers = await staffModel.deleteMany({})
        res.status(200).json({
            success:res.statusCode,
            message:"Deleted All Staff Members Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Failed",
            error:error.message
        })
    }
    

}

export const searchStaffMember = async (req,res) =>{
    const {q} = req.query
    try {
        if(!q) return res.status(400).json({message:"query 'q' is required"})

        const searchResults = await staffModel.find({ Name: { $regex: q, $options: 'i' } })
            .limit(5)

        res.status(200).json({ "Staff Members":searchResults})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log('error',error.message)
    }
}
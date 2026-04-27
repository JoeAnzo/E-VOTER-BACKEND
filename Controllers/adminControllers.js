import {randomInt} from 'crypto'
import adminModel from "../Models/Admin.js";
import studentModel from "../Models/Student.js";
import staffModel from '../Models/staff.js';
import { hashPassword,checkPassword } from "../Services/passwordHash.js";

export async function getAdminUsers(req,res) {
    try {
        const admins = await adminModel.find({})

        res.status(200).json({
            admins:admins
        })
    } catch (error) {
        res.status(500).json({
            error:error.message

        })
    }

}

export async function createNewAdminUser(req,res) {
    const {username,password} = req.body
    try {
        const hashedPassword = await hashPassword(password)
        const newAdmin = await new adminModel({username:username,password:hashedPassword})

        await newAdmin.save()
        res.status(200).json({
            message:"Successfully created Admin User",
            adminUser:newAdmin
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }

}

export async function loginAdminUser(req,res){
    const {username,password} = req.body
    try {
        const adminUser = await adminModel.findOne({
            username:username
        })

        if (!adminUser){
            res.status(401).json({
                message:"Admin User doesnot exist"
            }) 
        }

        const correctPassword = await checkPassword(password,adminUser.password)

        if (!correctPassword){
            res.status(401).json({
                message:"Password doesnot match"
            })
        }

        if (adminUser && correctPassword) {
            res.status(201).json({
                message:"You have logined in successfully",
                adminUser:adminUser
            })
        }

    } catch (error) {
        res.status(500).json(
            {
                message:error.message
            }
        )
        
    }
}

 export async function generateOTPsForStudents(req, res) {
  try {
    // 1. Get all users who don't have a code yet
    const students = await studentModel.find({ otp: { $exists: false } });
    
    if (students.length === 0) {
      return res.status(200).json({ message: "All users already have codes." });
    }

    // 2. Create a pool of numbers (e.g., 1000 to 9999)
    let pool = [];
    for (let i = 100000; i <= 999999; i++) {
      pool.push(i);
    }

    // 3. Shuffle the pool (Fisher-Yates)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = randomInt(0, i + 1);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    // 4. Create bulk update operations
    const bulkOps = students.map((user, index) => ({
      updateOne: {
        filter: { _id: user._id },
        update: { $set: { otp: pool[index] } }
      }
    }));

    // 5. Execute bulk update
    await studentModel.bulkWrite(bulkOps);

    res.status(200).json({ 
      success: true, 
      message: `Successfully assigned codes to ${users.length} students.` 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bulk generation failed" });
  }
}

 export async function generateOTPsForStaffMembers(req, res) {
  try {
    // 1. Get all users who don't have a code yet
    const staffMembers = await staffModel.find({ otp: { $exists: false } });
    
    if (staffMembers.length === 0) {
      return res.status(200).json({ message: "All staffMembers already have codes." });
    }

    // 2. Create a pool of numbers (e.g., 1000 to 9999)
    let pool = [];
    for (let i = 100000; i <= 999999; i++) {
      pool.push(i);
    }

    // 3. Shuffle the pool (Fisher-Yates)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = randomInt(0, i + 1);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    // 4. Create bulk update operations
    const bulkOps = staffMembers.map((user, index) => ({
      updateOne: {
        filter: { _id: user._id },
        update: { $set: { otp: pool[index] } }
      }
    }));

    // 5. Execute bulk update
    await staffModel.bulkWrite(bulkOps);

    res.status(200).json({ 
      success: true, 
      message: `Successfully assigned codes to ${staffMembers.length} staffMembers.` 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bulk generation failed" });
  }
}
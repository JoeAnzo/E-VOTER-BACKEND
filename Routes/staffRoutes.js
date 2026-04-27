import express from "express";
import {Router} from "express"
import { getAllStaffMembers,addNewStaffMember,deleteAllStaffMembers} from "../Controllers/staffController.js";

const staffRouter = Router()

staffRouter.get('/',getAllStaffMembers)
staffRouter.post('/',addNewStaffMember)
staffRouter.delete('/',deleteAllStaffMembers)

export default staffRouter
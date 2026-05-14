import express from 'express'
import { contactUs } from '../Controllers/contactController.js';
const contactUsRouter = express.Router()

contactUsRouter.post('/contact-us',contactUs)

export default contactUsRouter;
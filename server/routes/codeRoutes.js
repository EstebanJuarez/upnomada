
import express from "express";
import { generateCode, updatePassword } from "../controllers/codeController.js";

const codeRoute = express.Router();

codeRoute.post('/create', generateCode)
codeRoute.post('/update-password', updatePassword)


export default codeRoute;

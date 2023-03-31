import { Router } from "express";
import doctorsControllers from "../controllers/doctorsControllers.js";
const doctorsRouters = Router();

doctorsRouters.post("/signup",doctorsControllers.create)


export default doctorsRouters;
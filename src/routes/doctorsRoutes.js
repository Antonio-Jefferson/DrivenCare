import { Router } from "express";
import doctorsControllers from "../controllers/doctorsControllers.js";
import { validateSchema } from "../middlewares/schemaValidation.js";
import schemaDoctors from "../schemas/doctors.js";

const doctorsRouters = Router();

doctorsRouters.post("/signup",validateSchema(schemaDoctors),  doctorsControllers.create)
doctorsRouters.post("/signin", doctorsControllers.signin)

export default doctorsRouters;
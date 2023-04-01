import { Router } from "express";
import doctorsControllers from "../controllers/doctorsControllers.js";
import { validateSchema } from "../middlewares/schemaValidation.js";
import schemaDoctors from "../schemas/doctors.js";

const doctorsRoutes = Router();

doctorsRoutes.post("/signup",validateSchema(schemaDoctors),  doctorsControllers.create)
doctorsRoutes.post("/signin", doctorsControllers.signin)
doctorsRoutes.get("/:id/consultations", doctorsControllers.allConsults)

export default doctorsRoutes;
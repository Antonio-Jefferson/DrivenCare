import { Router } from "express";
import patientControllers from "../controllers/patientControllers.js";
import { validateSchema } from "../middlewares/schemaValidation.js";
import {patientSchemma} from "../schemas/patient.js"

const patientRoutes = Router();

patientRoutes.post("/signup", validateSchema(patientSchemma), patientControllers.create)
patientRoutes.post("/signin", patientControllers.signin)

export default patientRoutes;

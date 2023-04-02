import { Router } from "express";
import patientControllers from "../controllers/patientControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidation.js";
import {patientSchemma} from "../schemas/patient.js"

const patientRoutes = Router();

patientRoutes.post("/signup", validateSchema(patientSchemma), patientControllers.create)
patientRoutes.post("/signin", patientControllers.signin)
patientRoutes.get('/:id/consultations', authMiddleware.authValidation, patientControllers.allCosults)
patientRoutes.get("/", authMiddleware.authValidation, patientControllers.getAppointmentsForPatient)
export default patientRoutes;

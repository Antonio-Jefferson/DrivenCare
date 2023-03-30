import { Router } from "express";
import patientRoutes from "./patientRoutes.js"

const routes = Router();

routes.use("/patient", patientRoutes)
routes.use("/patient", patientRoutes)
export default routes;

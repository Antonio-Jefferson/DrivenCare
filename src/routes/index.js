import { Router } from "express";
import patientRoutes from "./patientRoutes.js"
import doctorsRouters from "./doctorsRoutes.js"
const routes = Router();

routes.use("/patients", patientRoutes);
routes.use("/doctors", doctorsRouters)

export default routes;

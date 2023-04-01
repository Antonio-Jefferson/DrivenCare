import { Router } from "express";
import patientRoutes from "./patientRoutes.js"
import doctorsRoutes from "./doctorsRoutes.js"
import consultationRoutes from "./consultationRoutes.js";

const routes = Router();

routes.use("/patients", patientRoutes);
routes.use("/doctors", doctorsRoutes);
routes.use("/appointments", consultationRoutes);

export default routes;

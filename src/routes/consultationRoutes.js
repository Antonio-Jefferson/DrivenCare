import { Router } from "express";
import consultationControllers from "../controllers/consultationControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js"
import { validateSchema } from "../middlewares/schemaValidation.js";
import { consultationSchema } from "../schemas/consultation.js";

const consultationRoutes = Router();

consultationRoutes.post("/schedule", validateSchema(consultationSchema), authMiddleware.authValidation, consultationControllers.create)
consultationRoutes.put("/:id/confirm", consultationControllers.updateConfirm)
consultationRoutes.put("/:id/cancel", consultationControllers.updateCancel)
consultationRoutes.put('/:id/carriedout', consultationControllers.updateCarriedOut)

export default consultationRoutes;
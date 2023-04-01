import Joi from "joi";


export const consultationSchema = Joi.object({
    doctorId: Joi.number().required(),
    date: Joi.string().pattern(/^(\d{2}\/\d{2}\/\d{4})$/).required(),
    time: Joi.string().pattern(/^(\d{2}:\d{2})$/).required()
  });
  
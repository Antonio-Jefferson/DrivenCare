import joi from "joi";

const schemaDoctors = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    specialty: joi.string().required(),
    location: joi.string().required()
})

export default schemaDoctors;
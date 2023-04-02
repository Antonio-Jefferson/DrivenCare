import patientRepositories from "../repositories/patientRepositories.js";
import patientServices from "../services/patientServices.js"

async function create(req, res, next) {
    const {name, email, password, phone} = req.body;
  
    try {
        await patientServices.create({name, email, password, phone});
        return res.sendStatus(201);
    } catch (error) {
        next(error)
    }
}

async function signin(req, res, next){
    const {email, password} = req.body
    try {
        const token = await patientServices.signin({ email, password });
        return res.send({ token });
    } catch (error) {
       next(error)
    }
}

async function allCosults(req, res){
  const {id} = res.locals.user;
  
  try {
    const consults = await patientServices.allCosults(id);
    res.send({consults})

  } catch (error) {
    next(error)
  }
}

async function getAppointmentsForPatient(){
    const {id} = res.locals.user;
    
    try {
        const result = await patientRepositories.getAppointmentsForPatient(id);
        res.send({result})
    } catch (error) {
        next(error)
    }
}
  
export default {
    create,
    signin,
    allCosults,
    getAppointmentsForPatient
}
import doctorsRepositories from "../repositories/doctorsRepositories.js";
import doctorsServices from "../services/doctorsServices.js"

async function create(req, res, next){
   const {name, email, password, specialty, location } = req.body

    try {
        await doctorsServices.create({name, email, password, specialty, location });
        res.sendStatus(201);
    } catch (error) {
        next(error)
    }
}

async function signin(req, res, next){
    const {email, password} = req.body;

    try {
        const token = await doctorsServices.signin({email, password});
        res.send({token});
    } catch (error) {
        next(error)
    }
}

async function allConsults(req, res, next){
    const {id} = req.params;

    try {
        const consults = await doctorsServices.allConsults(id)
        res.send({consults})

    } catch (error) {
        next(error)
    }
}

async function getByDoctorSearch(req, res, next){
    const { name, specialty, location } = req.query;

    try {
        const doctorsResult = await doctorsServices.getByDoctorSearch({ name, specialty, location });
        res.send(doctorsResult)
    } catch (error) {
       next(error)
    }
}

async function consultations(req, res, next){
    const {id} = res.locals.user;

    try {
        const result = await doctorsRepositories.getAppointmentsForDoctor(id);
        res.send({result})
    } catch (error) {
        next(error)
    }
}
export default{
    create,
    signin,
    allConsults,
    getByDoctorSearch,
    consultations
}
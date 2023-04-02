import consultationServices from "../services/consultationServices.js"

async function create(req, res, next){
    const {doctorId, date, time} = req.body;
    const {id} = res.locals.user;

    try {
        await consultationServices.create({doctorId, id, date, time})
        res.sendStatus(201);
    } catch (error) {
        next(error)
    }
}

async function updateConfirm(req, res, next){
    const {id} = req.params; 
    try {
        await consultationServices.updateConfirm(id)
        res.sendStatus(201);
    } catch (error) {
        next(error)
    }
}
async function updateCancel(req, res, next){
    const {id} = req.params; 

    try {
        await consultationServices.updateCancel(id)
        res.sendStatus(201);
    } catch (error) {
        next(error)
    }
}

async function updateCarriedOut(req, res, next){
    const {id} = req.params;

    try {
        await consultationServices.updateCarriedOut(id)
        res.sendStatus(200)
    } catch (error) {
       next(error)
    }
}

export default {
    create,
    updateConfirm,
    updateCancel,
    updateCarriedOut
}
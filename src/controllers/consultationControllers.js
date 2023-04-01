import consultationServices from "../services/consultationServices.js"

async function create(req, res){
    const {doctorId, date, time} = req.body;
    const {id} = res.locals.user;
    try {
        await consultationServices.create({doctorId, id, date, time})
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}

async function updateConfirm(req, res){
    const {id} = req.parames;
    console.log({id})
    try {
        await consultationServices.updateConfirm(id)
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message)
    }
}

export default {
    create,
    updateConfirm
}
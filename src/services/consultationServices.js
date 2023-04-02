import consultationRepositories from "../repositories/consultationRepositories.js"
import errors from "../errors/index.js";
import moment from "moment";


async function create({doctorId, id, date, time}){
    const {rowCount} = await consultationRepositories.findByDoctorTime({doctorId, time})

    if(rowCount){
        const nextAvailableTime = moment(time, 'HH:mm:ss').add(30, 'minutes').format('HH:mm:ss');
        throw errors.conflictError(`There is already an appointment scheduled for the doctor at that time. The next available time is ${nextAvailableTime}.`)
  }
    await consultationRepositories.create({doctorId, id, date, time})
}

async function updateConfirm(id){
    const {rowCount} =  await consultationRepositories.findByConsult(id);
    if(!rowCount) throw errors.notFoundError();

    await consultationRepositories.updateConfirm(id);
}

async function updateCancel(id){
    const {rowCount} =  await consultationRepositories.findByConsult(id);
    if(!rowCount) throw errors.notFoundError();

    await consultationRepositories.updateCancel(id);
}

async function updateCarriedOut(id){
    const consultId = Number(id)
    const {rowCount} =  await consultationRepositories.findByConsult(id);
    if(!rowCount) throw errors.notFoundError();

    await consultationRepositories.updateCarriedOut(consultId)
}

export default {
    create,
    updateConfirm,
    updateCancel,
    updateCarriedOut
}
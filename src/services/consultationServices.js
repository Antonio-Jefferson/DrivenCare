import consultationRepositories from "../repositories/consultationRepositories.js"
import moment from "moment";


async function create({doctorId, id, date, time}){
    const {rowCount} = await consultationRepositories.findByDoctorTime({doctorId, time})

    if(rowCount){
        const nextAvailableTime = moment(time, 'HH:mm:ss').add(30, 'minutes').format('HH:mm:ss');
        throw new Error(`There is already an appointment scheduled for the doctor at that time. The next available time is ${nextAvailableTime}.`)
  }
    
    await consultationRepositories.create({doctorId, id, date, time})
}

export default {
    create
}
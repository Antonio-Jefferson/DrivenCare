import connectionDb from "../config/conection.js"

async function findByDoctorTime({doctorId, time}){
    time = time.concat(":00");
    return connectionDb.query(`
    SELECT * FROM appointments
    WHERE doctor_id = $1 
    AND time = $2
    AND carried_out = false;
    `,[doctorId, time])
}

async function create({doctorId, id, date, time}){
    connectionDb.query(`
    INSERT INTO appointments (doctor_id, patient_id, date, time) 
    VALUES ($1, $2, $3, $4)
    `,[doctorId, id, date, time ])
}

async function findByConsult(id){
    const consultId = Number(id);
    console.log({consultId})
    return connectionDb.query(`
    SELECT * FROM appointments WHERE id = $1;
    `,[consultId])
}

async function updateConfirm(id){
    const consultId = Number(id);
    connectionDb.query(`
    UPDATE appointments SET confirm = TRUE WHERE id = $1;
    `,[consultId])
}

async function updateCancel(id){
    const consultId = Number(id);
    connectionDb.query(`
    UPDATE appointments SET confirm = FALSE WHERE id = $1;
    `,[consultId])
}

async function updateCarriedOut(id){
    connectionDb.query(`
    UPDATE appointments SET carried_out = TRUE WHERE id = $1;
    `,[id])
}
export default{
    findByDoctorTime,
    create,
    findByConsult,
    updateConfirm,
    updateCancel,
    updateCarriedOut
}
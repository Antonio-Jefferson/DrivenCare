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

export default{
    findByDoctorTime,
    create
}
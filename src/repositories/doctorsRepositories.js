import connectionDb from "../config/conection.js"


async function findByEmail(email){
    return connectionDb.query(`
        SELECT * FROM doctors WHERE email = $1
    `, [email])
}
async function create({name, email, password, specialty, location }){
    return connectionDb.query(`
        INSERT INTO doctors (name, email, password, specialty, location) VALUES ($1, $2, $3, $4, $5)
    `,[name, email, password, specialty, location ])
}

async function createSession({ token, doctorId }) {
  await connectionDb.query(
    `
      INSERT INTO sessions (token, user_type, doctor_id)
      VALUES ($1, 'doctor', $2)
    `,
    [token, doctorId]
  );
}


  async function findByDoctor(id){
    const doctorId = Number(id);
    return connectionDb.query(`
        SELECT * FROM doctors WHERE id = $1;
    `,[doctorId])
  }

  async function allConsults(id){
    const doctorId = Number(id);
    return connectionDb.query(`
        SELECT * FROM appointments WHERE doctor_id = $1 AND carried_out = TRUE;
    `,[doctorId])
  }

  async function getByDoctorSearch({ name, specialty, location }){
    return connectionDb.query(`
    SELECT id, name, specialty
    FROM doctors
    WHERE name ILIKE '%' || COALESCE($1, '') || '%'
      AND specialty ILIKE '%' || COALESCE($2, '') || '%'
      AND location ILIKE '%' || COALESCE($3, '') || '%';
    `,[name, specialty, location ])
  }

  async function getAppointmentsForDoctor(doctorId) {
    const result = await connectionDb.query(`
      SELECT 
        appointments.date, 
        appointments.time, 
        patients.name AS patient_name, 
        doctors.specialty 
      FROM 
        appointments 
        JOIN patients ON appointments.patient_id = patients.id 
        JOIN doctors ON appointments.doctor_id = doctors.id 
      WHERE 
        appointments.doctor_id = $1
      ORDER BY 
        appointments.date, 
        appointments.time
    `, [doctorId]);
  
    return result.rows;
  }
  
export default {
    findByEmail,
    create,
    createSession,
    findByDoctor,
    allConsults,
    getByDoctorSearch,
    getAppointmentsForDoctor
}
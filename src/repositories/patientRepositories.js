import connectionDb from "../config/conection.js"

async function findByEmail(email){
    console.log("valid email")  
    return await connectionDb.query(
        `
            SELECT * FROM patients WHERE email = $1
        `, [email]
    )
}

async function create({ name, email, password, phone }){
    console.log("created")  
    return connectionDb.query(`
        INSERT INTO patients (name, email, password, phone) VALUES ($1, $2, $3, $4)
    `, [name, email, password, phone])
}

async function createSession({ token, patientId }) {
    const type = "patient"
    await connectionDb.query(
      `
          INSERT INTO sessions (token, user_type, patient_id)
          VALUES ($1, $2, $3)
      `,
      [token,type, patientId]
    );
  }

  async function findSessionByToken(token) {
    return await connectionDb.query(
      `
          SELECT * FROM sessions WHERE token = $1
      `,
      [token]
    );
  }
  
  async function findById(id) {
    return await connectionDb.query(
      `    
      SELECT * FROM patients WHERE id=$1
    `,
      [id]
    );
  }

  async function allCosults(id){
    console.log({id})
    return await connectionDb.query(`
    SELECT * FROM appointments WHERE patient_id = $1 AND carried_out = TRUE;
    `,[id])
  }

export default{
    findByEmail,
    create,
    createSession,
    findSessionByToken,
    findById,
    allCosults
}
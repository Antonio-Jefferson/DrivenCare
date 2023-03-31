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
    await connectionDb.query(
      `
          INSERT INTO sessions (token, patient_id)
          VALUES ($1, $2)
      `,
      [token, patientId]
    );
  }

export default{
    findByEmail,
    create,
    createSession
}
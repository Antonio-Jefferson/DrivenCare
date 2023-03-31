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
          INSERT INTO sessions_doctors (token, doctor_id)
          VALUES ($1, $2)
      `,
      [token, doctorId]
    );
  }

export default {
    findByEmail,
    create,
    createSession
}
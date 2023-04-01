import patientServices from "../services/patientServices.js"

async function create(req, res) {
    const {name, email, password, phone} = req.body;
    console.log("controller")  
    try {
        await patientServices.create({name, email, password, phone});
        return res.sendStatus(201);
    } catch (error) {
        console.log(error)
        return res.status(500).sed(error.message)
    }
}

async function signin(req, res){
    const {email, password} = req.body
    try {
        const token = await patientServices.signin({ email, password });
        return res.send({ token });
    } catch (error) {
        console.log(error)
        return res.status(500).sed(error.message)
    }
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
  
export default {
    create,
    signin,
    findSessionByToken,
    findById
}
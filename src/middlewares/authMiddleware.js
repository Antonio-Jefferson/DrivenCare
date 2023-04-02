import errors from "../errors/index.js";
import patientRepositories from "../repositories/patientRepositories.js";

async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) throw errors.unauthorizedError();
  console.log({token})
  try {
    const {rows: session} = await patientRepositories.findSessionByToken(token);
   
    if (!session) throw errors.unauthorizedError();
    
    let user;
    if (session[0].user_type === "patient") {
      user = await patientRepositories.findById(session[0].patient_id);
    } else if (session[0].user_type === "doctor") {
      user = await doctorRepositories.findById(session[0].doctor_id);
    } else {
      throw errors.unauthorizedError();
    }
    
    if (!user) throw errors.notFoundError();
    
    res.locals.user = user.rows[0];
    next();
  } catch (err) {
    console.log(err)
    next(err);
  }
}

export default {authValidation};
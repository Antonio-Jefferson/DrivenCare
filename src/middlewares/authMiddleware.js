import errors from "../errors/index.js";
import patientRepositories from "../repositories/patientRepositories.js";

async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) throw errors.unauthorizedError();

  try {
    const {
      rows: [session],
    } = await patientRepositories.findSessionByToken(token);
    if (!session) throw errors.unauthorizedError();
    
    const {
      rows: [user],
    } = await patientRepositories.findById(session.patient_id);
    if (!user) throw errors.notFoundError();
  
    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err)
    next(err);
  }
}

export default {authValidation};
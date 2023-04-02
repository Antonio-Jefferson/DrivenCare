import bcrypt from "bcrypt";
import patientRepositories from "../repositories/patientRepositories.js";
import errors from "../errors/index.js"
import { v4 as uuidV4 } from "uuid";

async function create({ name, email, password, phone}) {
  const { rowCount } = await patientRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError();

  const hashPassword = await bcrypt.hash(password, 10);
  await patientRepositories.create({ name, email, password: hashPassword, phone });
}

async function signin({ email, password }){
  const {rowCount, rows: [patient]} = await patientRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, patient.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = uuidV4();
  await patientRepositories.createSession({ token, patientId: patient.id });
  return token;
}

async function allCosults(id){
  const patientId = Number(id)
 
  const result = await patientRepositories.allCosults(patientId);
  return result.rows;
}

export default{
  create, signin, allCosults
}
import bcrypt from "bcrypt";
import patientRepositories from "../repositories/patientRepositories.js";
import { v4 as uuidV4 } from "uuid";

async function create({ name, email, password, phone}) {
  console.log("services")  
  const { rowCount } = await patientRepositories.findByEmail(email);
  if (rowCount) throw new Error("User already exists");

  const hashPassword = await bcrypt.hash(password, 10);
  await patientRepositories.create({ name, email, password: hashPassword, phone });
}

async function signin({ email, password }){
  const {rowCount, rows: [patient]} = await patientRepositories.findByEmail(email);
  if (!rowCount) throw new Error("Incorrect email or password");

  const validPassword = await bcrypt.compare(password, patient.password);
  if (!validPassword) throw new Error("Incorrect email or password");

  const token = uuidV4();
  await patientRepositories.createSession({ token, patientId: patient.id });
  return token;
}
export default{
  create, signin
}
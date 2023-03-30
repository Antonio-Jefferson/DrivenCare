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

export default{
    create
}
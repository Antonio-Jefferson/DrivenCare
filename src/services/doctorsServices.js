import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import errors from "../errors/index.js";
import doctorsRepositories from "../repositories/doctorsRepositories.js";

async function create({name, email, password, specialty, location }){
   const {rowCount} = await doctorsRepositories.findByEmail(email);
    if(rowCount) throw errors.duplicatedEmailError();

    const hashPassword = await bcrypt.hash(password, 10);
    await doctorsRepositories.create({name, email, password: hashPassword, specialty, location })
}

async function signin({email, password}){
    const {rowCount, rows: [doctor],} = await doctorsRepositories.findByEmail(email);
    if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, doctor.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = uuidV4();
  await doctorsRepositories.createSession({ token, doctorId: doctor.id });

  return token;
}

async function allConsults(id){
    const {rowCount} =  await doctorsRepositories.findByDoctor(id);
    if(!rowCount) throw errors.notFoundError;

    const result = await doctorsRepositories.allConsults(id)
    return result.rows;
}

async function getByDoctorSearch({ name, specialty, location }){
    const {rows} = await doctorsRepositories.getByDoctorSearch({ name, specialty, location });
    return rows;
}


export default{
    create,
    signin,
    allConsults,
    getByDoctorSearch
}
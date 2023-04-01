import doctorsServices from "../services/doctorsServices.js"

async function create(req, res){
   const {name, email, password, specialty, location } = req.body
    try {
        await doctorsServices.create({name, email, password, specialty, location });
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function signin(req, res){
    const {email, password} = req.body;
    try {
        const token = await doctorsServices.signin({email, password});
        res.send({token});
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function allConsults(req, res){
    const {id} = req.params;
    try {
        const consults = await doctorsServices.allConsults(id)
        res.send({consults})

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function getByDoctorSearch(req, res){
    const { name, specialty, location } = req.query;
    try {
        const doctorsResult = await doctorsServices.getByDoctorSearch({ name, specialty, location });
        res.send(doctorsResult)
    } catch (error) {
        return res.status(500).send(error.message)
        console.log(error)
    }
}

export default{
    create,
    signin,
    allConsults,
    getByDoctorSearch
}
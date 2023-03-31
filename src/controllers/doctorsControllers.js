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

export default{
    create,
    signin
}
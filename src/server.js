import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";

const server = express();
dotenv.config();
server.use(cors);
server.use(json);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running in port: ${port}`));


import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js"

const server = express();
dotenv.config();
server.use(cors());
server.use(json());

server.use(routes);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running in port: ${port}`));


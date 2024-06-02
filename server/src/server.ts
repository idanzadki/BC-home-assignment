import express, { Express, Request, Response } from "express";
import cors from "cors";
import { appRouter } from "./routes";


const app: Express = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.use(appRouter)


app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});


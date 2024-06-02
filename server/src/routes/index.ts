import { Router } from "express";
import { apiRouter } from "./apiRoutes";

export const appRouter = Router()

appRouter.use("/api", apiRouter);

appRouter.get("/", (req, res) => {
    res.send("Welcome");
});


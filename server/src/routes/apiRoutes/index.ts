import { Router } from "express";
import { userRouter } from "./users";
import { postRouter } from "./posts";

export const apiRouter = Router()

apiRouter.get("/", (req, res) => {
    res.send("API");
});

apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);


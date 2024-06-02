import { Router } from "express";
import { readAllUsers } from "../../services/userServices";
import { getAllUsers } from "../../controllers/userController";

export const userRouter = Router()

userRouter.get("/", getAllUsers);

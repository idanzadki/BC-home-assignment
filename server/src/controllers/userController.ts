import { Request, Response } from "express";
import { readAllUsers } from "../services/userServices";


export const getAllUsers = (req: Request, res: Response) => {

    readAllUsers((cbRes) => {
        res.send(cbRes);
        return cbRes
    })
}
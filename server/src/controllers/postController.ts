import { Request, Response } from "express";

import { readAllPosts } from "../services/postServices";

export const getAllPosts = (req: Request, res: Response) => {

    readAllPosts((cbRes) => {

        res.send(cbRes);
        return cbRes
    })
}
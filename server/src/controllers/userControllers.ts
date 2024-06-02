import { readAllUsers } from "../services/userServices";

export const getAllUsers = (req: any, res: any) => {

    readAllUsers((cbRes) => {
        res.send(cbRes);
        return cbRes
    })
}
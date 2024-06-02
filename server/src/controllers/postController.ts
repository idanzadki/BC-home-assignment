import { readAllPosts } from "../services/postServices";

export const getAllPosts = (req: any, res: any) => {

    readAllPosts((cbRes) => {

        console.log('Res: ', cbRes);

        res.send(cbRes);
        return cbRes
    })
}
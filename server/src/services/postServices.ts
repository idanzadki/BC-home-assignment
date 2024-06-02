import { Request, Response } from "express";
import { readFile, writeFile } from "fs";
import path from "path";

const p = path.join(__dirname.replace('\src', '').replace('\services', ''), "/db/posts.json");
export const readAllPosts = (cb: (user: any[]) => void) => {
    return readFile(p, { encoding: "utf-8" }, function (e, content) {
        if (e) throw e;
        let parsed: any[] = JSON.parse(content)
        cb(parsed)
    });
};

export const allPosts = (req: Request, res: Response) => readAllPosts((cbRes) => {

    res.send(cbRes);
    return cbRes
})


export const addNewPost = (req: Request, res: Response) => {
    let post = req.body
    console.log('Post: ', post);


    try {

        readAllPosts((posts: any[]) => {


            let id = posts.length + 1
            const t = posts.map(i => i.id)
            console.log('t: ', t);
            const postMax = Math.max(...t)
            console.log('id: ', postMax);
            id = Math.max(id, postMax)
            if (id === postMax) {
                id += 1
            }
            console.log('new Id: ', id, postMax);
            const n = { ...post, id }
            const add = [...posts, n]


            writeFile(p, JSON.stringify(add), (saveRes) => {
                console.log('Save Res: ', saveRes);
                res.send(add)
            });
        })

    } catch (error) {
        res.send({ error: 'Delete Error' });
    }
}

export const updatePost = (req: Request, res: Response) => {
    let post = req.body
    console.log('Update: ', post);

    try {
        readAllPosts((posts: any[]) => {
            const old = posts.find(i => `${i.id}` === `${post.id}`)
            console.log('Old: ', old);

            const up = { ...old, ...post }
            const upList = posts.map(i => i.id === up.id ? up : i)
            writeFile(p, JSON.stringify(upList), cb => { })
            res.send(upList)
        })

    } catch (error) {
        res.send({ error: 'Delete Error' });
    }
}

export const deletePost = (req: Request, res: Response) => {
    const post = req.params
    console.log('Del: ', post);

    try {
        readAllPosts((posts: any[]) => {
            const fil = posts.filter(i => `${i.id}` !== `${post.id}`)
            writeFile(p, JSON.stringify(fil), cb => { })
            res.send(fil)
        })

    } catch (error) {
        res.send({ error: 'Delete Error' });
    }
}

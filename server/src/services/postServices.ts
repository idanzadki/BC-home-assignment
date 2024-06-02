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

export const allPosts = (req: any, res: any) => {

    readAllPosts((cbRes) => {

        res.send(cbRes);
        return cbRes
    })
}

export const addNewPost = (req: any, res: any) => {
    let post = req.body

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

export const updatePost = (req: any, res: any) => {
    const post = req.body
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
            // console.log('new Id: ', id, postMax);
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

export const deletePost = (req: any, res: any) => {
    const post = req.params
    try {
        readAllPosts((posts: any[]) => {
            const fil = posts.filter(i => `${i.id}` !== `${post.id}`)
            let p = path.join(__dirname.replace('src', ''), "/db/posts.json");
            writeFile(p, JSON.stringify(fil), cb => { })
            res.send(fil)
        })

    } catch (error) {
        res.send({ error: 'Delete Error' });
    }
}

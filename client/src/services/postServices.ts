import { PostData } from "../types";

export const updatePost = async (post: PostData) => {

    const res = await fetch("http://127.0.0.1:3000/api/posts", {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
        },
        body: JSON.stringify(post),
    })
    console.log('Res: ', res);

    return res && res
}

export const addNewPost = async (post: Omit<PostData, 'id'>) => {

    const res = await fetch("http://127.0.0.1:3000/api/posts", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
        },
        body: JSON.stringify(post),
    })
    console.log('Res: ', res);

    return res && res
}
export const deletePost = async (post: PostData) => {

    const res = await fetch("http://127.0.0.1:3000/api/deletePost/" + post.id, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
        },

    })
    const r = await res.json()

    return r && r
}

export const getAllPosts = async () => {

    const res = await (await fetch("http://127.0.0.1:3000/api/posts")).json()
    // console.log('Res: ', res);

    return res && res
}

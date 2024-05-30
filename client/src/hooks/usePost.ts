import { useCallback, useEffect, useMemo, useState } from "react";
import { useModal } from "../components/modal";
import { PostData, UserData } from "../types";
import { addNewPost, getAllPosts } from "../services/postServices";

export const usePost = () => {

    const [posts, setPosts] = useState<PostData[]>([]);
    const { openModal, closeModal } = useModal();



    const handleGetPosts = useCallback(async () => {

        try {

            const posts = await getAllPosts()
            // console.log('Posts: ', posts);
            setPosts(posts)
            return posts

        } catch (error) {
            console.log('Get Posts Error: ', error);
            return false
        }

    }, [setPosts])

    const handleAddPost = useCallback(async (post: PostData) => {
        try {
            const { id, userId, ...ob } = post
            console.log('ID: ,USERiD: ', id, userId);

            // if (userId < 0) throw Error('No User Exist')

            if (id < 0) {
                console.log('OB: ', ob);
                // const newPost = await addNewPost(ob)
                // if (newPost) {
                //     console.log('New: ', newPost);
                //     closeModal()
                // }
            }

        }
        catch (error: any) {
            // console.log('Error: ', error);
            closeModal()

            openModal('error', { title: 'Error', text: `${error}` })
        }



    }, [setPosts])

    const handleDeletePost = useCallback(async (post?: PostData) => {

    }, [])

    const handleUpdatePost = useCallback((updatePost?: PostData) => {

    }, [])


    const handleLike = useCallback(async (postId: number) => {


    }, [])


    useEffect(() => {
        handleGetPosts()
    }, [])

    return {
        posts,
        handleUpdatePost,
        handleGetPosts,
        handleAddPost,
        handleLike,
        handleDeletePost
    }

}
import { useCallback, useEffect, useMemo, useState } from "react";
import { useModal } from "../components/modal";
import { PostData, UserData } from "../types";
import { addNewPost, deletePost, getAllPosts, updatePost } from "../services/postServices";

export const usePost = (user?: UserData | null) => {

    const [posts, setPosts] = useState<PostData[]>([]);
    const { openModal, closeModal } = useModal();

    const handleGetPosts = useCallback(async () => {
        try {

            const posts = await getAllPosts()
            setPosts(posts)
            return posts

        } catch (error) {
            console.log('Get Posts Error: ', error);
            return false
        }

    }, [setPosts])

    const handleAddPost = useCallback(async (post: PostData) => {
        try {
            if (user) {

                const newPost: Omit<PostData, 'id'> = { ...post, userId: user?.id }
                const n = await (await addNewPost(newPost)).json()
                if (n) {
                    setPosts(n)
                    closeModal()
                    return true
                }
            }

        }
        catch (error: any) {
            closeModal()
            openModal('error', { title: 'Error', text: `${error}` })
        }

    }, [setPosts, user])

    const handleDeletePost = useCallback(async (post?: PostData) => {
        if (post) {
            const res = await deletePost(post)
            console.log('d: ', res);
            res && setPosts(res)
            closeModal()
        }
    }, [setPosts])


    const handleUpdatePost = useCallback(async (update: PostData) => {
        const res = await (await updatePost(update)).json()
        console.log('Res: ', res);
        if (res) {
            setPosts(res)
            closeModal()
        }
    }, [setPosts, posts])


    const handleLike = useCallback(async (postId: number) => {

        let newOb: PostData | null = posts.find(i => i.id === postId) || null
        if (newOb && user) {
            if (newOb.likes) {
                if (!newOb.likes.includes(user.id))
                    newOb = { ...newOb, likes: [...newOb.likes, user.id] }
                else
                    newOb = { ...newOb, likes: newOb.likes.filter(i => i !== user.id) }
            }
            else
                newOb = { ...newOb, likes: [user.id] }
            const res = await (await updatePost(newOb)).json()
            res && setPosts(res)
        }

    }, [posts, setPosts, user])


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
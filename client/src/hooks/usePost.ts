import { useCallback, useEffect, useMemo, useState } from "react";
import { useModal } from "../components/modal";
import { PostData, UserData } from "../types";
import { addNewPost, deletePost, getAllPosts, updatePost } from "../services/postServices";

export const usePost = ({ user, error, onError }: { user?: UserData | null, error?: boolean, onError?: () => void }) => {

    const [posts, setPosts] = useState<PostData[]>([]);
    const { openModal, closeModal } = useModal();

    const handleGetPosts = useCallback(async () => {
        try {

            const posts = await getAllPosts()
            setPosts(posts)
            return posts

        } catch (error) {
            onError && onError
            return false
        }

    }, [setPosts])

    const handleAddPost = useCallback(async (post: PostData) => {
        try {
            if (user) {

                const newPost: Omit<PostData, 'id'> = { ...post, userId: user?.id }
                const n = await addNewPost(newPost)
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
            if (res) {
                setPosts(res)
                closeModal()
            }
        }
    }, [setPosts])


    const handleUpdatePost = useCallback(async (update: PostData) => {
        const res: PostData[] = await updatePost(update)
        if (res) {
            setPosts(res)
            closeModal()
        }
    }, [setPosts])


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
            const res = await updatePost(newOb)
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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useModal } from "../components/modal";
import { PostData, UserData } from "../types";

export const useUser = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [tempUsers, setTempUsers] = useState<UserData[]>([]);
    const [posts, setPosts] = useState<PostData[]>([]);
    const [userId, setUserId] = useState<number>(-1);
    const { openModal, closeModal } = useModal();

    const user: UserData | null = useMemo(() => userId && users.find(i => i.id === userId) || null, [userId, users])

    const handleGetUsers = useCallback(() => {

    }, [])

    const handleGetPosts = useCallback(async () => {

    }, [])

    const handleSetUserId = useCallback((userId: number) => {
    }, [])

    const handleAddPost = useCallback(async (post?: PostData) => {


    }, [])

    const handleDeletePost = useCallback(async (post?: PostData) => {

    }, [])

    const handleUpdatePost = useCallback((updatePost?: PostData) => {

    }, [])



    const handleSwitchUser = useCallback(() => {


    }, [])

    const handleLike = useCallback(async (postId: number) => {


    }, [])


    useEffect(() => {

    }, [])

    return {
        users,
        posts,
        userId,
        user,
        handleUpdatePost,
        handleGetPosts,
        handleGetUsers,
        handleSetUserId,
        handleAddPost,
        handleSwitchUser,
        handleLike,
        handleDeletePost
    }

}
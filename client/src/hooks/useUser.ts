import { useCallback, useEffect, useMemo, useState } from "react";
import { useModal } from "../components/modal";
import { PostData, UserData } from "../types";
import { getAllPosts } from "../services/postServices";
import { getAllUsers } from "../services/userServices";

export const useUser = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [tempUsers, setTempUsers] = useState<UserData[]>([]);
    const [posts, setPosts] = useState<PostData[]>([]);
    const [userIdx, setUserIdx] = useState<number>(-1);
    const { openModal, closeModal } = useModal();

    const user = useMemo(() => {
        if (userIdx && users.length > 0) return users[userIdx] || null
    }, [userIdx, users])

    const handleGetUsers = useCallback(async () => {
        try {

            const users = await getAllUsers()
            // console.log('Users: ', users);
            setUsers(users)
            setTempUsers(users)
            const rand = Math.round(Math.random() * users.length)
            setUserIdx(rand)
            return users

        } catch (error) {
            console.log('Get Users Error: ', error);
            return false
        }

    }, [setUsers, setUserIdx, setTempUsers])


    const handleSetUserId = useCallback((userId: number) => {
    }, [])


    const handleSwitchUser = useCallback(() => {

        if (userIdx >= 0) {

            let randomIndex = -1
            let newList: UserData[] = []
            if (tempUsers.length == 0) {
                randomIndex = Math.floor(users.length * Math.random())
                const newOb = users[randomIndex]
                newList = [newOb]
            }
            else {
                newList = tempUsers.filter((i, idx) => idx !== userIdx)
                randomIndex = Math.floor(newList.length * Math.random())
            }
            setUserIdx(randomIndex)
            setTempUsers(newList)
            // setUsers(newList)
        }

    }, [users, setUsers, tempUsers, userIdx, setUserIdx])

    const handleLike = useCallback(async (postId: number) => {


    }, [])


    useEffect(() => {
        handleGetUsers()
        handleSwitchUser()
    }, [])

    return {
        users,
        posts,
        user,
        handleGetUsers,
        handleSetUserId,
        handleSwitchUser,
        handleLike,
    }

}
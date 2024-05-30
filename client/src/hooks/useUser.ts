import { useCallback, useEffect, useMemo, useState } from "react";
import { UserData } from "../types";
import { getAllUsers } from "../services/userServices";

export const useUser = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [tempUsers, setTempUsers] = useState<UserData[]>([]);
    const [userId, setUserId] = useState<number>(-1);

    const user = useMemo(() => tempUsers.find(i => i.id === userId) || null, [tempUsers, userId])

    const tempList = useMemo(() => tempUsers.filter(i => i.id !== user?.id), [tempUsers])

    const handleGetUsers = useCallback(async () => {
        try {

            const users = await getAllUsers()
            const rand = Math.round(Math.random() * users.length)
            const ob = users[rand]
            setUsers(users)
            setTempUsers(users)
            setUserId(ob.id)
            return users

        } catch (error) {
            console.log('Get Users Error: ', error);
            return false
        }

    }, [setUsers, setTempUsers, setUserId])


    const handleSwitchUser = useCallback(() => {

        if (tempList.length > 0) {
            const randomIdx = Math.floor(tempList.length * Math.random() || 0)
            const randomId = tempList[randomIdx].id

            setUserId(randomId)
            setTempUsers(tempList)
        }
        else {
            const randomIdx = Math.floor(users.length * Math.random() || 0)
            const randomId = users[randomIdx].id

            setTempUsers(users)
            setUserId(randomId)
        }

    }, [tempList, users, setTempUsers, setUserId])




    useEffect(() => {
        if (!user) {

            handleGetUsers()
        }

    }, [user])

    return {
        users,
        user,
        handleGetUsers,
        handleSwitchUser,
    }

}
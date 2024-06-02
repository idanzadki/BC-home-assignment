import { useCallback, useEffect, useMemo, useState } from "react";
import { UserData } from "../types";
import { getAllUsers } from "../services/userServices";
import { useModal } from "../components/modal";

export const useUser = ({ onError, error }: { onError: (error: any) => void, error: boolean }) => {

    const [users, setUsers] = useState<UserData[] | null>(null);
    const [tempUsers, setTempUsers] = useState<UserData[] | null>(null);
    const [userId, setUserId] = useState<number>(-1);

    const user = useMemo(() => tempUsers && tempUsers.find(i => i.id === userId) || null, [tempUsers, userId])

    const tempList = useMemo(() => tempUsers && tempUsers.filter(i => i.id !== user?.id) || null, [tempUsers])
    const { openModal, closeModal } = useModal();


    const handleGetUsers = useCallback(async () => {

        try {
            const users = await getAllUsers()
            const rand = Math.round(Math.random() * users.length)
            const ob = users[rand]

            if (users) {

                setUsers(users)
                setTempUsers(users)
                setUserId(ob.id)
                return users
            }


        } catch (error) {
            console.log('Get Users Error: ', error);
            onError(error)
            setTempUsers(null)
            return false
            // throw error
        }

    }, [setUsers, setTempUsers, setUserId, onError, error])


    const handleSwitchUser = useCallback(() => {

        if (tempList && tempList.length > 0) {
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
        console.log('useUser: ', users);
        console.log('useUser Error: ', error);

        if (!error && !users) {
            console.log('Getting users: ', error);
            handleGetUsers()
        }
    }, [error, users])

    return {
        users,
        user,
        handleGetUsers,
        handleSwitchUser,
    }

}
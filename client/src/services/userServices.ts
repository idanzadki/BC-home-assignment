
export const getAllUsers = async () => {

    try {
        const res = await fetch("http://127.0.0.1:3000/api/users")
        if (res) {
            const users = await res.json()
            if (users) {
                return users
            }
            return res && res
        }
    } catch (error) {
        console.log('Get Users Service Error: ', error);
        throw error

    }
    // console.log('Res: ', res);

}



export const getAllUsers = async () => {

    const res = await fetch("http://127.0.0.1:3000/api/users").catch(err => {
        throw err
    })
    if (res) {
        const users = await res.json()
        if (users)
            return res && res
    }
    // console.log('Res: ', res);

}


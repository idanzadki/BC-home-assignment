import { PostData, UserData } from "../types";

export const likesParser = (users: UserData[], post: PostData, user: UserData) => {
    if (users) {
        if (post.likes && post.likes?.length > 3) {
            return `${post.likes && post.likes.includes(user.id) ? 'You , ' : ''} ${post?.likes?.filter(i => i !== user.id)
                ?.map((i) => {
                    const ob = users.find((j) => j.id === i)?.name
                    return ob
                }).splice(0, 3)
                .join(`${" , "}`)} and ${post.likes.length - 3} more`
        }
        return `${post.likes && post.likes.includes(user.id) ? 'You , ' : ''} ${post?.likes?.filter(i => i !== user.id)
            ?.map((i) => {
                const ob = users.find((j) => j.id === i)?.name
                return ob
            })
            .join(`${" , "}`)}`
    }
}


export const nameParser = (name: string) => {
    const split = name.split(' ')
}

export const dateParser = (date: string) => {

    const d = new Date(date)
    const newDate = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
    return newDate

}
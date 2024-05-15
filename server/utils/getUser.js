export const getUser = async (session) => {
    return await $fetch('/api/user', {
        method: 'POST',
        body: {
            username: session?.user?.username
        }
    })
}
const userTransformer = (user) => {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        image: user.image,
    }
}
export default userTransformer
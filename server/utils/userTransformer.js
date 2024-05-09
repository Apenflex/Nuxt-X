const userTransformer = (user) => {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
    }
}

export default userTransformer
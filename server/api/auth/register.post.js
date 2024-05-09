// import { createUser } from '~/utils/actions/createUser.js'
// import userTransformer from "~/utils/hooks/userTransformer.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, email, password, repeatPassword, name } = body

    if (!username || !email || !password || !repeatPassword || !name) {
        return sendError(event, createError(
            {
                statusCode: 400,
                statusMessage: 'Invalid params'
            }
        ))
    }

    if (password !== repeatPassword) {
        return sendError(event, createError(
            {
                statusCode: 400,
                statusMessage: 'Passwords do not match'
            }
        ))
    }

    const userData = {
        username,
        email,
        password,
        name,
        profileImage: 'https://api.dicebear.com/8.x/pixel-art/svg'
    }

    const user = await createUser(userData)

    return {
        body: userTransformer(user)
    }
})
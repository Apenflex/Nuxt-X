import { prisma } from "~/prisma/client.js";
import bcrypt from "bcrypt";

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
    
    const isUserExist = await prisma.user.findUnique({
        where: {
            username
        }
    })
    if(isUserExist) {
        throw createError({
            statusMessage: 'User already exists'
        })
    }

    const user = await createUser(userData)

    const { accessToken } = generateTokens(user)

    await createRefreshToken(
        {
            token: accessToken,
            userId: user.id
        }
    )

    return {
        access_token: accessToken,
        user: userTransformer(user)
    }
})
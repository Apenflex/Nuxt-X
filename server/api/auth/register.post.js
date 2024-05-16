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

    const user = {
        username,
        email,
        hashedPassword: bcrypt.hashSync(password, 10),
        name,
        image: 'https://api.dicebear.com/8.x/pixel-art/svg'
    }

    const createdUser = await prisma.user.create({
        data: user
    })

    return { user: userTransformer(createdUser) }
    // {
    //     access_token: accessToken,
    //     user: userTransformer(user)
    // }
})
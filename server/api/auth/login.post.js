import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log(event, 'login event')
    const { username, password } = body
    if (!username || !password) {
        return sendError(event, createError(
            {
                statusCode: 400,
                statusMessage: 'Invalid params'
            }
        ))
    }

    const user = await getUserByUserName(username)
    if (!user) {
        throw createError({
            statusMessage: 'User not found'
        })
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) {
        throw createError({
            statusMessage: 'Invalid password'
        })
    }

    const { accessToken, refreshToken } = generateTokens(user)

    const existingToken = await getTokenByUserId(user.id)

    if (existingToken) {
        await updateTokenByUserId(user.id, refreshToken);
    } else {
        await createRefreshToken(
            {
                token: refreshToken,
                userId: user.id
            }
        )
    }

    return {
        access_token: existingToken ? refreshToken : accessToken,
        user: userTransformer(user)
    }
})
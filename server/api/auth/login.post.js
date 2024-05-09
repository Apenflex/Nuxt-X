import bcrypt from "bcrypt";
// import { getUserByUserName } from '~/composables/getUserByUserName.js'
// import { generateTokens, sendRefreshTokenCookie, createRefreshToken } from '~/composables/jwt.js'
// import userTransformer from "~/utils/hooks/userTransformer.js"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(event, 'login event')
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
        return sendError(event, createError(
            {
                statusCode: 400,
                statusMessage: 'User not found'
            }
        ))
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) {
        return sendError(event, createError(
            {
                statusCode: 400,
                statusMessage: 'Invalid password'
            }
        ))
    }

    const { accessToken, refreshToken } = generateTokens(user)

    await createRefreshToken(
        {
            token: refreshToken,
            userId: user.id
        }
    )

    sendRefreshTokenCookie(event, refreshToken)

    return {
        access_token: accessToken,
        user: userTransformer(user)
    }
})
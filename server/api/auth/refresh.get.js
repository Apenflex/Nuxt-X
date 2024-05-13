export default defineEventHandler(async (event) => {
    const cookies = useCookies(event)

    const refreshToken = cookies.refresh_token

    if (!refreshToken) {
        throw createError({
            statusMessage: 'Refresh token is invalid'
        })
    }

    const rToken = await getRefreshTokenByToken(refreshToken)
    if (!rToken) {
        throw createError({
            statusMessage: 'Refresh token is invalid'
        })
    }

    return {
        hello: rToken
    }
})
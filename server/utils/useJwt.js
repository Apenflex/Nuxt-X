import jwt from 'jsonwebtoken'
import { prisma } from "~/prisma/client.js";

const generateAccessToken = (user) => {
    const config = useRuntimeConfig()

    return jwt.sign(
        {
            userId: user.id
        },
        config.jwtAccessSecret,
        {
            expiresIn: '15m'
        }
    )
}
const generateRefreshToken = (user) => {
    const config = useRuntimeConfig()

    return jwt.sign(
        {
            userId: user.id
        },
        config.jwtRefreshSecret,
        {
            expiresIn: '1d'
        }
    )
}

export const generateTokens = (user) => {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        accessToken,
        refreshToken
    }
}
// export const sendRefreshTokenCookie = (event, refreshToken) => {
//     setCookie(event.res, "refresh_token", refreshToken, {
//         httpOnly: true,
//         sameSite: true
//     })
// }

export const createRefreshToken = (refreshToken) => {
    return prisma.refreshToken.create({
        data: refreshToken
    })
}

export const getRefreshTokenByUserId = (userId) => {
    return prisma.refreshToken.findFirst({
        where: {
            userId
        }
    })
}

export const updateRefreshToken = (userId, refreshToken) => {
    return prisma.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            token: refreshToken
        }
    })
}
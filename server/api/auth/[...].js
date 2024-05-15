import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from "~/prisma/client.js";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from "bcrypt";

const config = useRuntimeConfig()

export default NuxtAuthHandler({
    pages: {
        signIn: '/login',
    },
    // adapter: PrismaAdapter(prisma),
    // callbacks: {
    //     session: {
    //         session: async ({ session, token } => {
    //             const user = await getUser(session)
    //             return Promise.resolve(session)
    //         })
    //     } 
    // },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
            clientId: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider.default({
            name: 'credentials',
            async authorize(credentials) {
                // console.log(credentials, 'Credentials from Login Form')
                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username
                    }
                })
                // console.log(user, 'User from MongoDB')
                if(!user) {
                    throw createError({
                        statusMessage: 'User not found'
                    })
                }
                const isPasswordMatch = bcrypt.compareSync(credentials.password, user.password)
                // console.log(Boolean(isPasswordMatch), 'isPasswordMatch')
                if (!isPasswordMatch) {
                    throw createError({
                        statusMessage: 'Invalid password'
                    })
                }
                // console.log('Credentials Match:', credentials.username === user.username && credentials.password === user.password )
                // console.log(credentials.username, user.username, isPasswordMatch)
                if (credentials.username === user.username && isPasswordMatch) {
                    return user
                }
            }
        })
    ]
})
import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from "~/prisma/client.js";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
    pages: {
        signIn: '/login',
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: {
            session: async ({ session, token } => {
                const user = await getUser(session)
                return Promise.resolve(session)
            })
        } 
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        // GithubProvider.default({
        //     clientId: 'enter-your-client-id-here',
        //     clientSecret: 'enter-your-client-secret-here'
        // }),
        CredentialsProvider.default({
            name: 'Credentials',
            async authorize(credentials) {
                const user = {
                    username: '@test',
                    password: '123'
                }
                // console.log(credentials, 'credentials')
                // const user = await getUserByUserName(credentials.username)
                // console.log(user, 'user')
                // if(!user) {
                //     throw createError({
                //         statusMessage: 'User not found'
                //     })
                // }
                // const isPasswordMatch = bcrypt.compareSync(credentials.password, user.password)
                // if (!isPasswordMatch) {
                //     throw createError({
                //         statusMessage: 'Invalid password'
                //     })
                // }

                // console.log(credentials, 'credentials')
                if(credentials.username === user.username && credentials.password === user.password) {
                    return user
                }
            }
        })
    ]
})
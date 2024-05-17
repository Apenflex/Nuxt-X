import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from "~/prisma/client.js";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from "bcrypt";

const config = useRuntimeConfig()

export default NuxtAuthHandler({
    secret: config.authSecret,
    pages: {
        signIn: '/login',
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
            clientId: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider.default({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                // console.log(credentials, 'Credentials')
                const user = await prisma.user.findUnique({
                    where: {
                        // username: credentials.username
                        email: credentials.email
                    }
                })
                // console.log(user, 'User from MongoDB')
                if(!user) {
                    throw createError({
                        statusMessage: 'User not found'
                    })
                }
                const isPasswordMatch = bcrypt.compareSync(credentials.password, user.hashedPassword)
                // console.log(Boolean(isPasswordMatch), 'isPasswordMatch')
                if (!isPasswordMatch) {
                    throw createError({
                        statusMessage: 'Invalid password'
                    })
                }
                // console.log('Credentials Match:', credentials.username === user.username && credentials.password === user.password )
                // console.log(credentials.username, user.username, isPasswordMatch)
                // console.log(user, 'User')
                if (credentials.email === user.email && isPasswordMatch) {
                    return userTransformer(user)
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token = {
                    ...token,
                    ...user
                }
            }
            return token
        },
        async session({ session, token }) {
            session.user = {
                ...token,
                ...session.user
            }
            return session
        }
    },
})
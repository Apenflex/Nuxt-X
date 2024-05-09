import { prisma } from "~/prisma/client.js";

export const getUserByUserName = (username) => {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}
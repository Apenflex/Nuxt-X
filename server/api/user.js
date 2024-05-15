import { getServerSession } from '#auth'

export default eventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body, 'body')
    const session = await getServerSession(event)
    console.log(session, 'session')
    if(!session) {
        return { status: 'Unautheticated' }
    }

    const user = await prisma.user.findUnique({
        where: {
            username: body.username
        }
    })

    return user
})
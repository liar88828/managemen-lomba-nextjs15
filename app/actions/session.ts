import { cookies } from "next/headers"
import { getIronSession } from "iron-session"
import { randomBytes } from "crypto"
import { prisma } from "../lib/prisma"
import { SessionData, sessionOptions } from "./config"




// ambil session existing
export async function getSession() {
    const cookieStore = await cookies()
    return getIronSession<SessionData>(cookieStore, sessionOptions)
}

export async function createSession(userId: string) {
    const token = randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    return prisma.session.create({
        data: {
            token,
            userId,
            expiresAt,
        },
    })

}

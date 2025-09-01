'use server'
import { cookies } from "next/headers"
import { getIronSession } from "iron-session"
import { randomBytes } from "crypto"
import { prisma } from "../lib/prisma"
import { SessionData, sessionOptions, SessionUser } from "./config"


// Get existing session
export async function getSession() {
    const cookieStore = await cookies()
    return getIronSession<SessionData>(cookieStore, sessionOptions)
}

// Get existing session
export async function getSessionUser() {
    const { destroy, updateConfig, ...session } = await getSession()
    return session
}

// Create a new session
export async function createSession(user: SessionUser) {
    const token = randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    const userSession = await prisma.session.findUnique({ where: { userId: user.id } })
    if (!userSession) {
        await prisma.session.create({
            data: {
                token,
                userId: user.id,
                expiresAt,
            },
        })
    }

    // Save in Iron Session
    const cookieStore = await cookies()
    const ironSession = await getIronSession<SessionData>(cookieStore, sessionOptions)
    ironSession.user = user
    ironSession.token = token
    ironSession.expiresAt = expiresAt
    await ironSession.save()
    return getSession()
}

// Update existing session
export async function updateSession(token: string, newUser?: SessionUser, extendExpiry = false) {
    const updateData: Partial<{ userId: string; expiresAt: Date }> = {}

    if (newUser) updateData.userId = newUser.id
    if (extendExpiry) updateData.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const updatedSession = await prisma.session.update({
        where: { token },
        data: updateData,
    })

    // Update Iron Session cookie
    const cookieStore = await cookies()
    const ironSession = await getIronSession<SessionData>(cookieStore, sessionOptions)
    if (newUser) ironSession.user = newUser
    if (extendExpiry) ironSession.expiresAt = updateData.expiresAt!
    await ironSession.save()

    return updatedSession
}

// Delete a session
export async function deleteSession(userId: string) {
    const deletedSession = await prisma.session.delete({
        where: { userId }
    })

    // Clear Iron Session cookie
    const cookieStore = await cookies()
    const ironSession = await getIronSession<SessionData>(cookieStore, sessionOptions)
    ironSession.destroy()

    return deletedSession
}
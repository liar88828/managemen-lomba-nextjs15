"use server"

import bcrypt from "bcryptjs"
import { prisma } from "../lib/prisma"
import { createSession, getSession } from "./session"


export async function registerAction(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = (formData.get("role") as "PESERTA" | "PANITIA" | "ADMIN") ?? "PESERTA"

    if (!name || !email || !password) {
        return { success: false, message: "Data tidak lengkap" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role },
        })

        // Simpan ke DB session
        const { token, expiresAt } = await createSession(user.id)

        // Simpan ke cookie (iron-session)
        const session = await getSession()
        session.user = {
            id: user.id, name: user.name, email: user.email,
            // @ts-expect-error
            role: user.role
        }
        session.token = token
        session.expiresAt = expiresAt
        await session.save()

        return { success: true, message: "Pendaftaran berhasil!", user: session.user }
    } catch (error: any) {
        return { success: false, message: error.message }
    }
}

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return { success: false, message: "User tidak ditemukan" }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return { success: false, message: "Password salah" }

    // Simpan ke DB session
    const { token, expiresAt } = await createSession(user.id)

    // Simpan ke cookie (iron-session)
    const session = await getSession()
    session.user = {
        id: user.id, name: user.name, email: user.email,
        // @ts-expect-error
        role: user.role
    }
    session.token = token
    session.expiresAt = expiresAt
    await session.save()

    return { success: true, message: `Selamat datang ${user.name}!`, user: session.user }
}

export async function logoutAction() {
    const session = await getSession()

    // Hapus session dari DB
    if (session.token) {
        await prisma.session.deleteMany({
            where: { token: session.token },
        })
    }

    // Hapus cookie
    session.destroy()
    return { success: true, message: "Logout berhasil" }
}

export interface SessionUser {
    id: string
    name: string
    email: string
    role: "PESERTA" | "PANITIA" | "ADMIN",

}

export interface SessionData {
    user?: SessionUser,
    token: string,
    expiresAt: Date,
}

export const sessionOptions = {
    password: process.env.SESSION_SECRET!, // isi di .env
    cookieName: "myapp_session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}

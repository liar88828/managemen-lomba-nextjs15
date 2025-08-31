// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getIronSession } from "iron-session"
import { prisma } from "./app/lib/prisma"
import { SessionData, sessionOptions } from "./app/actions/config"



export async function middleware(req: NextRequest) {
  const protectedRoutes = ["/dashboard", "/panitia", "/admin"] // ⬅️ sesuaikan
  const { pathname } = req.nextUrl


  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Ambil session dari cookie (iron-session)
  const res = NextResponse.next()
  const session = await getIronSession<SessionData>(req, res, sessionOptions)

  console.log("Session:", session)
  if (!session.user || !session.token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // // Validasi ke DB
  // const dbSession = await prisma.session.findUnique({
  //   where: { token: session.token },
  // })
  // console.log(dbSession)
  // if (!dbSession) {
  //   session.destroy()
  //   return NextResponse.redirect(new URL("/login", req.url))
  // }

  // // Cek apakah expired
  // if (new Date(dbSession.expiresAt) < new Date()) {
  //   await prisma.session.delete({ where: { token: session.token } })
  //   session.destroy()
  //   return NextResponse.redirect(new URL("/login", req.url))
  // }

  return res
}

// Tentukan route mana saja yang kena middleware
export const config = {
  matcher: ["/dashboard/:path*",
    "/panitia/:path*",
    "/peserta/:path*",
    "/admin/:path*"
  ],
}

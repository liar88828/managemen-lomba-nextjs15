import React from 'react'
import { SideBar } from '../panitia/page'
export const menuPanitia = [
    { title: "Dashboard", link: "/panitia" },
    { title: "Daftar Lomba", link: "/panitia/lomba" },
    { title: "Peserta", link: "/panitia/peserta" },
    { title: "Juri", link: "/panitia/juri" },
    { title: "Pengaturan", link: "/panitia/settings" },
]

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <SideBar menu={menuPanitia} />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}
